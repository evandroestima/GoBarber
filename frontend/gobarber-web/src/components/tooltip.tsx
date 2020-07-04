import React from "react";
import styled from "styled-components";

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      {console.log(title)}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

//styles
const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    &::before {
      content: "";
      border-style: solid;
      border-color: #ec2300 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
