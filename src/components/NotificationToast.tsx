import { Toaster, Position, IToastProps, Intent } from "@blueprintjs/core";

const toast = Toaster.create({
  position: Position.BOTTOM,
  maxToasts: 1
});

export function showError(message: string, options?: Partial<IToastProps>) {
  toast.show({ message, intent: Intent.DANGER, ...options });
}

export function showInfo(message: string, options?: Partial<IToastProps>) {
  toast.show({ message, intent: Intent.PRIMARY, ...options });
}
export function showSuccess(message: string, options?: Partial<IToastProps>) {
  toast.show({ message, intent: Intent.SUCCESS, ...options });
}
