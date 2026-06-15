import type { CSSProperties } from 'vue';
import { toast } from 'vue-sonner';

const baseStyle: CSSProperties = {
  width: 'fit-content',
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderWidth: '3px',
  borderStyle: 'solid',
  borderRadius: '24px',
  fontWeight: 500,
  color: '#fff'
};

export const toaster = {
  error: (message: string) =>
    toast(message, {
      position: 'top-right',
      duration: 6000,
      style: {
        ...baseStyle,
        borderColor: '#FDD5BA',
        backgroundColor: '#512F2D'
      }
    }),
  success: (message: string) =>
    toast(message, {
      position: 'top-right',
      duration: 6000,
      style: {
        ...baseStyle,
        borderColor: '#f0edfe',
        backgroundColor: '#6b4cf5'
      }
    })
};
