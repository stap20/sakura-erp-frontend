import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { AppInput } from "@/components/shared/AppInput";
import { AppButton } from "@/components/shared/AppButton";
import { MaterialType } from "../types";
import type { CreateMaterialDto } from "../types";

interface MaterialFormProps {
  onSubmit: (data: CreateMaterialDto) => Promise<void>;
  onCancel?: () => void;
  defaultValues?: Partial<CreateMaterialDto>;
}

const materialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.number().min(0, "Must be positive"),
  unitPrice: z.number().min(0, "Must be positive"),
  reorderLevel: z.number().min(0, "Must be positive"),
  description: z.string().optional(),
});

export function MaterialForm({
  onSubmit,
  onCancel,
  defaultValues,
}: MaterialFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
      type: defaultValues?.type || MaterialType.RAW_MATERIAL,
      unit: defaultValues?.unit || "kg",
      quantity: defaultValues?.quantity || 0,
      unitPrice: defaultValues?.unitPrice || 0,
      reorderLevel: defaultValues?.reorderLevel || 0,
      description: defaultValues?.description || "",
    } as CreateMaterialDto,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = form.state.values;
    const result = materialSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = String(issue.path[0]) as any;
        form.setFieldMeta(path, (meta) => ({
          ...meta,
          errors: [issue.message],
        }));
      });
      return;
    }

    form.handleSubmit();
  };

  return (
    <form onSubmit={handleCustomSubmit} className="space-y-4">
      <form.Field name="name">
        {(field) => (
          <AppInput
            label="Name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0])
                : undefined
            }
          />
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="type">
          {(field) => (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label
                htmlFor="material-type"
                className="text-sm font-medium leading-none"
              >
                Type
              </label>
              <select
                id="material-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value as MaterialType)
                }
              >
                <option value={MaterialType.RAW_MATERIAL}>Raw Material</option>
                <option value={MaterialType.PACKAGING}>Packaging</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Field name="unit">
          {(field) => (
            <AppInput
              label="Unit (kg, ml, pcs)"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0] as string | undefined}
            />
          )}
        </form.Field>

        <form.Field name="quantity">
          {(field) => (
            <AppInput
              label="Initial Quantity"
              type="number"
              step="any"
              value={field.state.value}
              onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              error={field.state.meta.errors[0] as string | undefined}
            />
          )}
        </form.Field>

        <form.Field name="unitPrice">
          {(field) => (
            <AppInput
              label="Unit Price ($)"
              type="number"
              step="any"
              value={field.state.value}
              onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              error={field.state.meta.errors[0] as string | undefined}
            />
          )}
        </form.Field>

        <form.Field name="reorderLevel">
          {(field) => (
            <AppInput
              label="Reorder Alert Level"
              type="number"
              step="any"
              value={field.state.value}
              onChange={(e) => field.handleChange(parseFloat(e.target.value))}
              error={field.state.meta.errors[0] as string | undefined}
            />
          )}
        </form.Field>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <AppButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </AppButton>
        )}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <AppButton type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Material"}
            </AppButton>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
