import { useOutlet, useLocation } from "@remix-run/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
