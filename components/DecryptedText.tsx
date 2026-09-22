'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const styles: Record<string, React.CSSProperties> = {
  wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' },
  srOnly: {
    position: 'absolute', width: '1px', height: '1px',
    padding: 0, margin: '-1px', overflow: 'hidden',
    clip: 'rect(0,0,0,0)', border: 0, visibility: 'hidden',
  },
};

type AnimateOn = 'hover' | 'inViewHover' | 'view' | 'click';
type RevealDirection = 'start' | 'end' | 'center';
type ClickMode = 'once' | 'toggle';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: RevealDirection;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: AnimateOn;
  clickMode?: ClickMode;
  [key: string]: unknown;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) =>
      originalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      }).join(''),
    [availableChars]
  );

  const computeOrder = useCallback((len: number): number[] => {
    if (len <= 0) return [];
    if (revealDirection === 'start') return Array.from({ length: len }, (_, i) => i);
    if (revealDirection === 'end')  return Array.from({ length: len }, (_, i) => len - 1 - i);
    const order: number[] = [];
    const middle = Math.floor(len / 2);
    let offset = 0;
    while (order.length < len) {
      if (offset % 2 === 0) { const idx = middle + offset / 2; if (idx >= 0 && idx < len) order.push(idx); }
      else                   { const idx = middle - Math.ceil(offset / 2); if (idx >= 0 && idx < len) order.push(idx); }
      offset++;
    }
    return order.slice(0, len);
  }, [revealDirection]);

  const fillAllIndices = useCallback(() => {
    const s = new Set<number>();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set: Set<number>, count: number) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) arr.splice(Math.floor(Math.random() * arr.length), 1);
    return new Set(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const empty = new Set<number>();
    setRevealedIndices(empty);
    setDisplayText(shuffleText(text, empty));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) { orderRef.current = computeOrder(text.length); pointerRef.current = 0; }
    setRevealedIndices(new Set());
    setDirection('forward');
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    } else {
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    }
    setDirection('reverse');
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const len = text.length;
      if (revealDirection === 'start') return revealedSet.size;
      if (revealDirection === 'end')   return len - 1 - revealedSet.size;
      const middle = Math.floor(len / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (nextIndex >= 0 && nextIndex < len && !revealedSet.has(nextIndex)) return nextIndex;
      for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i;
      return 0;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        if (sequential) {
          if (direction === 'forward') {
            if (prev.size < text.length) {
              const next = new Set(prev); next.add(getNextIndex(prev));
              setDisplayText(shuffleText(text, next)); return next;
            }
            clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(true); return prev;
          }
          if (direction === 'reverse') {
            if (pointerRef.current < orderRef.current.length) {
              const next = new Set(prev); next.delete(orderRef.current[pointerRef.current++]);
              setDisplayText(shuffleText(text, next));
              if (next.size === 0) { clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false); }
              return next;
            }
            clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false); return prev;
          }
        } else {
          if (direction === 'forward') {
            setDisplayText(shuffleText(text, prev)); currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(intervalRef.current!); setIsAnimating(false);
              setDisplayText(text); setIsDecrypted(true);
            }
            return prev;
          }
          if (direction === 'reverse') {
            const cur = prev.size === 0 ? fillAllIndices() : prev;
            const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
            const next = removeRandomIndices(cur, removeCount);
            setDisplayText(shuffleText(text, next)); currentIteration++;
            if (next.size === 0 || currentIteration >= maxIterations) {
              clearInterval(intervalRef.current!); setIsAnimating(false); setIsDecrypted(false);
              setDisplayText(shuffleText(text, new Set())); return new Set();
            }
            return next;
          }
        }
        return prev;
      });
    }, speed);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, direction, fillAllIndices, removeRandomIndices]);

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set()); setIsDecrypted(false);
    setDisplayText(text); setDirection('forward'); setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false); setRevealedIndices(new Set());
    setDisplayText(text); setIsDecrypted(true); setDirection('forward');
  }, [text]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true); } });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    queueMicrotask(() => {
      if (animateOn === 'click') encryptInstantly();
      else { setDisplayText(text); setIsDecrypted(true); }
      setRevealedIndices(new Set());
      setDirection('forward');
    });
  }, [animateOn, text, encryptInstantly]);

  const handleClick = () => {
    if (animateOn !== 'click') return;
    if (clickMode === 'once') { if (!isDecrypted) triggerDecrypt(); }
    else { if (isDecrypted) triggerReverse(); else triggerDecrypt(); }
  };

  const animateProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === 'click'
      ? { onClick: handleClick }
      : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...animateProps}
      {...(props as Record<string, unknown>)}
    >
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={revealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
