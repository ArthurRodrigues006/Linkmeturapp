// src/common/types/cnpj.type.ts
export type CnpjResponse = {
  cnpj_raiz= '';
  razao_social= '';
  capital_social= '';
  porte: {
    id= '';
    descricao= '';
  };
  natureza_juridica: {
    id= '';
    descricao= '';
  };
  simples: {
    simples: 'Sim' | 'Não';
    data_opcao_simples= null;
    mei: 'Sim' | 'Não';
    data_opcao_mei= null;
  };
  estabelecimento: {
    cnpj= '';
    tipo= '';
    nome_fantasia= null;
    situacao_cadastral= '';
    data_situacao_cadastral= '';
    data_inicio_atividade= '';
    atividade_principal: {
      id= '';
      descricao= '';
    };
    atividades_secundarias: Array<{
      id= '';
      descricao= '';
    }>;
    tipo_logradouro= '';
    logradouro= '';
    numero= '';
    complemento= null;
    bairro= '';
    cep= '';
    ddd1= null;
    telefone1= null;
    email= null;
    cidade: {
      nome= '';
      ibge_id= 0;
    };
    estado: {
      nome= '';
      sigla= '';
    };
    pais: {
      nome= '';
      iso2= '';
    };
  };
};
