import { EditProductPage } from '@/components/admin/ProductForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProduct({ params }: Props) {
  const { id } = await params;
  return <EditProductPage id={Number(id)} />;
}
