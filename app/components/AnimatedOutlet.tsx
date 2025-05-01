import { useOutlet, useLocation } from "@remix-run/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/**
 * Component that provides transition animations for Remix routes
 * @component
 * @returns {JSX.Element} Container with transition animations for route content
 * 
 * @description
 * This component uses react-transition-group to animate route transitions.
 * The animations are defined in CSS styles using the classes 'fade-enter',
 * 'fade-enter-active', 'fade-exit', and 'fade-exit-active'.
 * 
 * @example
 * ```tsx
 * <AnimatedOutlet />
 * ```
 */
export default function AnimatedOutlet() {
  const outlet = useOutlet();
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <div className="transition-container">{outlet}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}
