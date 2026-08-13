import { criarMensagensOperacao } from '../../../commons/constants/constants.entity';
import {
  gerarMensagem,
  MENSAGEM_GENERICA,
} from '../../../commons/constants/mensagem.sistema';

const ENTITY_NAME = 'event_spotlight';
const ALIAS_NAME = 'Destaque de Evento';

export const EVENT_SPOTLIGHT = {
  ENTITY: ENTITY_NAME,

  ALIAS: ALIAS_NAME,

  TABLE_FIELDS: {
    ID_EVENT_SPOTLIGHT: 'id_event_spotlight',
    ID_EVENT: 'id_event',
    START_DATE: 'start_date',
    END_DATE: 'end_date',
  },

  FIELDS: {
    ID_EVENT_SPOTLIGHT: 'idEventSpotlight',
    ID_EVENT: 'id_event',
    START: 'start_date',
    END: 'end_date',
  },

  SEARCH: {
    POR_ID: `${ENTITY_NAME}.idEventSpotlight`,
  },

  SWAGGER: {
    ID_EVENT_SPOTLIGHT: `Código do ${ALIAS_NAME} de identificação única`,
    ID_EVENT: `Código do evento vinculado ao ${ALIAS_NAME}`,
    START: `Data de início do ${ALIAS_NAME}`,
    END: `Data final do ${ALIAS_NAME}`,
  },

  MENSAGEM: getMensagem(ALIAS_NAME),

  ROTAS: {
    BASE: 'spotlights',
    ID: ':id',
  },

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

export const fieldsEventSpotlight = Object.values(EVENT_SPOTLIGHT.FIELDS);
