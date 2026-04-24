import { addDays, format, startOfDay } from 'date-fns';
import { notFound } from 'next/navigation';
import { listarEventosAction } from '../../../actions/event/buscar-event-actions';
import ListEvent from '../../../components/event/list-event';

export default async function Page(props: {
  searchParams: Promise<{
    search?: string;
    startDate?: string;
    endDate?: string;
  }>;
}) {
  const hoje = startOfDay(new Date());
  const daquiTrintaDias = addDays(hoje, 30);
  const params = await props.searchParams;
  const startDate = params.startDate || format(hoje, 'yyyy-MM-dd');
  const endDate = params.endDate || format(daquiTrintaDias, 'yyyy-MM-dd');

  const result = await listarEventosAction(params.search, startDate, endDate);

  if (!result.dados) return notFound();

  return <ListEvent result={result} initialDates={{ start: startDate, end: endDate }} />;
}
