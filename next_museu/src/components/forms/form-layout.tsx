import { AlertCircle, Ban, Loader2, LucideIcon, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface FormContainerProps {
  title: string;
  description?: string;
  state?: any; // Resultado do Action (success, message)
  isPending?: boolean;
  onSubmit?: () => void;
  formId: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  action?: string;
  confirm?: string;
  ConfirmIcon?: LucideIcon;
  href?: string;
  cancel?: string;
  CancelIcon?: LucideIcon;
  ariaLabelCon?: string;
  ariaLabelCancel?: string;
}

export function FormContainer({
  title,
  description,
  state,
  isPending,
  onSubmit,
  formId,
  children,
  footerActions,
  action,
  confirm,
  ConfirmIcon,
  href,
  cancel,
  CancelIcon,
  ariaLabelCon,
  ariaLabelCancel,
}: FormContainerProps) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto border-none">
        <CardHeader className="text-primary text-center">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>
          {state?.message && !state.success && (
            <div className="mx-auto max-w-fit mb-2 flex items-center gap-2 p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {state.message}
            </div>
          )}
          <form
            id={formId}
            onSubmit={onSubmit}
            className="flex flex-col items-center"
          >
            <div className="w-full mx-auto">{children}</div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-center gap-4">
          {footerActions || (
            <>
              {href && (
                <Button
                  asChild
                  variant="secondary"
                  className="min-w-[300px] md:min-w-[400px]"
                  disabled={isPending}
                  aria-label={ariaLabelCancel}
                >
                  <Link href={href}>
                    {CancelIcon ? (
                      <CancelIcon className="size-4" />
                    ) : (
                      <Ban className="size-4" />
                    )}
                    {cancel}
                  </Link>
                </Button>
              )}
              {action && confirm && (
                <Button
                  type="submit"
                  form={formId}
                  disabled={isPending}
                  className="min-w-[300px] md:min-w-[400px] "
                  aria-label={ariaLabelCon}
                >
                  {ConfirmIcon ? (
                    <ConfirmIcon className="size-4" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {action}
                    </>
                  ) : (
                    confirm
                  )}
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
