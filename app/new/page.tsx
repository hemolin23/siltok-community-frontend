import { RecordForm } from '@/components/record-form';

type RecordType = 'project' | 'workflow' | 'issue';

export default async function NewRecordPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const initialType: RecordType = params.type === 'workflow' || params.type === 'issue' ? params.type : 'project';
  return <main className="record-page"><RecordForm initialType={initialType} /></main>;
}
