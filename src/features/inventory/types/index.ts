export const MaterialType = {
    RAW_MATERIAL: 'RAW_MATERIAL',
    PACKAGING: 'PACKAGING',
} as const;

export type MaterialType = typeof MaterialType[keyof typeof MaterialType];

export interface Material {
    id: string;
    name: string;
    type: MaterialType;
    unit: string;
    quantity: number;
    unitPrice: number;
    reorderLevel: number;
    description?: string;
    vendorId?: string;
}

export type CreateMaterialDto = Omit<Material, 'id'>;

export interface Vendor {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export type CreateVendorDto = Omit<Vendor, 'id'>;
