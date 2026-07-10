'use client';

import { MessageCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { whatsappLink } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  message?: string;
  label: string;
  variant?: 'primary' | 'green' | 'outline' | 'outlineLight';
  size?: 'md' | 'lg';
  className?: string;
}

export default function WhatsAppButton({
  message,
  label,
  variant = 'primary',
  size = 'md',
  className,
}: WhatsAppButtonProps) {
  return (
    <MagneticButton
      href={whatsappLink(message)}
      external
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </MagneticButton>
  );
}
