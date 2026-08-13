import { criarMensagensOperacao } from '../../../commons/constants/constants.entity';
import {
  gerarMensagem,
  MENSAGEM_GENERICA,
} from '../../../commons/constants/mensagem.sistema';
import {
  gerarRotaRecurso,
  RotaRecurso,
} from '../../../commons/constants/url.sistema';

const ENTITY_NAME = 'event_bookings';
const ALIAS_NAME = 'Reserva de Evento';

export const EVENT_BOOKING = {
  ENTITY: ENTITY_NAME,
  ALIAS: ALIAS_NAME,
  TABLE_FIELDS: {
    ID_BOOKING: 'id_booking',
    ID_EVENT: 'id_event',
    ID_VISITOR: 'id_visitor',
    ID_USER: 'id_user',
    ID_GROUP: 'id_group',
    EXPECTED_PARTICIPANT_COUNT: 'expected_participant_count',
    BOOKING_DATE: 'booking_date',
    STATUS: 'status',
    NOTES: 'notes',
  },
  FIELDS: {
    ID_BOOKING: 'id_booking',
    ID_EVENT: 'event',
    ID_VISITOR: 'visitor',
    ID_USER: 'user',
    ID_GROUP: 'group',
    EXPECTED_PARTICIPANT_COUNT: 'expected_participant_count',
    BOOKING_DATE: 'booking_date',
    STATUS: 'status',
    NOTES: 'notes',
  },
  SEARCH: {
    POR_ID: `${ENTITY_NAME}.id_booking`,
  },
  SWAGGER: {
    ID_BOOKING: `Código da ${ALIAS_NAME} de identificação única`,
    ID_EVENT: `ID do Evento vinculado à ${ALIAS_NAME}`,
    ID_VISITOR: `ID do Visitante vinculado à ${ALIAS_NAME}`,
    ID_USER: `ID do Usuário vinculado à ${ALIAS_NAME}`,
    ID_GROUP: `ID do Grupo Escolar vinculado à ${ALIAS_NAME}`,
    EXPECTED_PARTICIPANT_COUNT: `Quantidade esperada de participantes na ${ALIAS_NAME}`,
    BOOKING_DATE: `Data de realização da ${ALIAS_NAME}`,
    STATUS: `Situação atual da ${ALIAS_NAME} (PENDENTE, CONFIRMADO, CANCELADO)`,
    NOTES: `Observações extras cadastradas na ${ALIAS_NAME}`,
  },
  MENSAGEM: getMensagem(ALIAS_NAME),
  ROTAS: getRotas('bookings'),
  OPERACAO: criarMensagensOperacao(ALIAS_NAME),
} as const;

function getMensagem(ALIAS: string) {
  return {
    ENTIDADE_CADASTRADA: gerarMensagem(
      MENSAGEM_GENERICA.ENTIDADE_CADASTRADA,
      ALIAS,
    ),
    ENTIDADE_NAO_ENCONTRADA: gerarMensagem(
      MENSAGEM_GENERICA.ENTIDADE_NAO_ENCONTRADA,
      ALIAS,
    ),
    EMAIL_CADASTRADO: gerarMensagem(MENSAGEM_GENERICA.EMAIL_CADASTRADO, ALIAS),
    ENTIDADE_ALTERADA: gerarMensagem(
      MENSAGEM_GENERICA.ENTIDADE_ALTERADA,
      ALIAS,
    ),
    ENTIDADE_EXCLUIDA: gerarMensagem(
      MENSAGEM_GENERICA.ENTIDADE_EXCLUIDA,
      ALIAS,
    ),
    ENTIDADE_LOCALIZADA: gerarMensagem(
      MENSAGEM_GENERICA.ENTIDADE_LOCALIZADA,
      ALIAS,
    ),
    ENITDADE_LISTADA: gerarMensagem(MENSAGEM_GENERICA.ENTIDADE_LISTADA, ALIAS),
  };
}

function getRotas(ENTITY: string): RotaRecurso {
  return gerarRotaRecurso(ENTITY);
}

export const fieldsEventBooking = Object.values(EVENT_BOOKING.FIELDS);
