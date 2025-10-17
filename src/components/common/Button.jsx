import React from 'react'
import styled from 'styled-components'
import { Loader2 } from 'lucide-react'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  border: none;
  
  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: ${props.theme.typography.fontSize.sm};
        `
      case 'large':
        return `
          padding: 16px 32px;
          font-size: ${props.theme.typography.fontSize.lg};
        `
      default:
        return `
          padding: 12px 24px;
          font-size: ${props.theme.typography.fontSize.base};
        `
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: ${props.theme.colors.primary.main};
          color: ${props.theme.colors.primary.contrast};
          box-shadow: ${props.theme.shadows.sm};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary.dark};
            box-shadow: ${props.theme.shadows.md};
          }
        `
      case 'secondary':
        return `
          background-color: ${props.theme.colors.secondary.main};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.secondary.dark};
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid ${props.theme.colors.primary.main};
          color: ${props.theme.colors.primary.main};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary.main};
            color: white;
          }
        `
      case 'ghost':
        return `
          background-color: transparent;
          color: ${props.theme.colors.text.primary};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.background.hover};
          }
        `
      case 'danger':
        return `
          background-color: ${props.theme.colors.error};
          color: white;

          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `
      default:
        return ''
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`

const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: ${props => props.theme.spacing.sm};
`

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <IconWrapper>
          <Loader2 size={16} className="spinning" />
        </IconWrapper>
      )}
      {!loading && Icon && (
        <IconWrapper>
          <Icon size={16} />
        </IconWrapper>
      )}
      {children}
    </StyledButton>
  )
}

export default Button