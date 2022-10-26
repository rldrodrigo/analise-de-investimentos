import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreasuryboundService {

  readonly apiTreasuryBound = 'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json';
  readonly planilhaTesouroDireto = 'https://www.tesourotransparente.gov.br/ckan/dataset/f0468ecc-ae97-4287-89c2-6d8139fb4343/resource/e5f90e3a-8f8d-4895-9c56-4bb2f7877920/download/VendasTesouroDireto.csv';

  constructor(
    private http: HttpClient,
  ) { }

  public listTreasuriesBound(){

    let data = {
      "responseStatus": 200,
      "responseStatusText": "success",
      "statusInfo": "OK",
      "response": {
          "BdTxTp": {
              "cd": 0
          },
          "TrsrBondMkt": {
              "opngDtTm": "2022-10-24T09:25:00",
              "clsgDtTm": "2022-10-25T05:00:00",
              "qtnDtTm": "2022-10-24T15:23:45.847",
              "stsCd": 4,
              "sts": "Fechado"
          },
          "TrsrBdTradgList": [
              {
                  "TrsrBd": {
                      "cd": 159,
                      "nm": "Tesouro Selic 2023",
                      "featrs": "Título com rentabilidade diária vinculada à taxa de juros da economia (taxa Selic). Isso significa que se a taxa Selic aumentar a sua rentabilidade aumenta e se a taxa Selic diminuir, sua rentabilidade diminui.",
                      "mtrtyDt": "2023-03-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Esse investimento garante que, mesmo em caso de resgate antecipado, o montante do dinheiro resgatado será superior ao inicialmente investido.  Como não paga juros semestrais, é mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de curto prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 0.0244,
                      "minRedQty": 0.01,
                      "untrRedVal": 12330.210000,
                      "minRedVal": 123.300000,
                      "isinCd": "BRSTNCLF1R82",
                      "FinIndxs": {
                          "cd": 17,
                          "nm": "SELIC"
                      },
                      "wdwlDt": "2019-02-01T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 171,
                      "nm": "Tesouro Selic 2024",
                      "featrs": "Título com rentabilidade diária vinculada à taxa de juros da economia (taxa Selic). Isso significa que se a taxa Selic aumentar a sua rentabilidade aumenta e se a taxa Selic diminuir, sua rentabilidade diminui.\r\n",
                      "mtrtyDt": "2024-09-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Como não paga juros semestrais, é mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento\r\n",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de curto prazo\r\n",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 0.0234,
                      "minRedQty": 0.01,
                      "untrRedVal": 12325.930000,
                      "minRedVal": 123.260000,
                      "isinCd": "BRSTNCLF0008",
                      "FinIndxs": {
                          "cd": 17,
                          "nm": "SELIC"
                      },
                      "wdwlDt": "2022-02-24T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 164,
                      "nm": "Tesouro Selic 2025",
                      "featrs": "Título com rentabilidade diária vinculada à taxa de juros da economia (taxa Selic). Isso significa que se a taxa Selic aumentar a sua rentabilidade aumenta e se a taxa Selic diminuir, sua rentabilidade diminui.",
                      "mtrtyDt": "2025-03-01T00:00:00",
                      "minInvstmtAmt": 123.190000,
                      "untrInvstmtVal": 12319.100000,
                      "invstmtStbl": "Como não paga juros semestrais, é mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de curto prazo",
                      "anulInvstmtRate": 0.0420,
                      "anulRedRate": 0.0520,
                      "minRedQty": 0.01,
                      "untrRedVal": 12316.200000,
                      "minRedVal": 123.160000,
                      "isinCd": "BRSTNCLF1RC4",
                      "FinIndxs": {
                          "cd": 17,
                          "nm": "SELIC"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 172,
                      "nm": "Tesouro Selic 2027",
                      "featrs": "Título com rentabilidade diária vinculada à taxa de juros da economia (taxa Selic). Isso significa que se a taxa Selic aumentar a sua rentabilidade aumenta e se a taxa Selic diminuir, sua rentabilidade diminui.\r\n",
                      "mtrtyDt": "2027-03-01T00:00:00",
                      "minInvstmtAmt": 122.530000,
                      "untrInvstmtVal": 12253.400000,
                      "invstmtStbl": "Como não paga juros semestrais, é mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento\r\n",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de curto prazo\r\n",
                      "anulInvstmtRate": 0.1464,
                      "anulRedRate": 0.1564,
                      "minRedQty": 0.01,
                      "untrRedVal": 12248.100000,
                      "minRedVal": 122.480000,
                      "isinCd": "BRSTNCLF1RG5",
                      "FinIndxs": {
                          "cd": 17,
                          "nm": "SELIC"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 155,
                      "nm": "Tesouro Prefixado 2023",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título).",
                      "mtrtyDt": "2023-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem pode deixar o seu dinheiro render até o vencimento do investimento, pois não paga juros semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 13.7800,
                      "minRedQty": 0.01,
                      "untrRedVal": 976.210000,
                      "minRedVal": 9.760000,
                      "isinCd": "BRSTNCLTN7D3",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2021-02-08T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 146,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2023",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de  juros semestrais).",
                      "mtrtyDt": "2023-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros) Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 13.7900,
                      "minRedQty": 0.01,
                      "untrRedVal": 1023.840000,
                      "minRedVal": 10.240000,
                      "isinCd": "BRSTNCNTF147",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2014-01-27T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 173,
                      "nm": "Tesouro Prefixado 2024",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título).\r\n",
                      "mtrtyDt": "2024-07-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem pode deixar o seu dinheiro render até o vencimento do investimento, pois não paga juro semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelos seus valores de mercado.\r\n",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de curto prazo.\r\n",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 12.3400,
                      "minRedQty": 0.01,
                      "untrRedVal": 823.710000,
                      "minRedVal": 8.240000,
                      "isinCd": "BRSTNCLTN7W3",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2022-02-24T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 161,
                      "nm": "Tesouro Prefixado 2025",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título).",
                      "mtrtyDt": "2025-01-01T00:00:00",
                      "minInvstmtAmt": 31.350000,
                      "untrInvstmtVal": 783.920000,
                      "invstmtStbl": "É mais interessante para quem pode deixar o seu dinheiro render até o vencimento do investimento, pois não paga juro semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelos seus valores de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de médio prazo.",
                      "anulInvstmtRate": 11.8000,
                      "anulRedRate": 11.9200,
                      "minRedQty": 0.01,
                      "untrRedVal": 782.090000,
                      "minRedVal": 7.820000,
                      "isinCd": "BRSTNCLTN7N2",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 151,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2025",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de  juros semestrais).",
                      "mtrtyDt": "2025-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros) Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 12.0200,
                      "minRedQty": 0.01,
                      "untrRedVal": 994.750000,
                      "minRedVal": 9.950000,
                      "isinCd": "BRSTNCNTF170",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2016-01-26T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 165,
                      "nm": "Tesouro Prefixado 2026",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título).\r\n",
                      "mtrtyDt": "2026-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem pode deixar o seu dinheiro render até o vencimento do investimento, pois não paga juro semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelos seus valores de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de médio prazo.\r\n",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 11.9000,
                      "minRedQty": 0.01,
                      "untrRedVal": 698.870000,
                      "minRedVal": 6.990000,
                      "isinCd": "BRSTNCLTN7U7",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2022-02-24T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 157,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2027",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de juros semestrais).",
                      "mtrtyDt": "2027-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 11.9200,
                      "minRedQty": 0.01,
                      "untrRedVal": 972.060000,
                      "minRedVal": 9.720000,
                      "isinCd": "BRSTNCNTF1P8",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2018-02-07T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 174,
                      "nm": "Tesouro Prefixado 2029",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título).",
                      "mtrtyDt": "2029-01-01T00:00:00",
                      "minInvstmtAmt": 34.960000,
                      "untrInvstmtVal": 499.570000,
                      "invstmtStbl": "É mais interessante para quem pode deixar o seu dinheiro render até o vencimento do investimento, pois não paga juro semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelos seus valores de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de médio prazo.",
                      "anulInvstmtRate": 11.9200,
                      "anulRedRate": 12.0400,
                      "minRedQty": 0.01,
                      "untrRedVal": 496.280000,
                      "minRedVal": 4.960000,
                      "isinCd": "BRSTNCLTN806",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 162,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2029",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de juros semestrais).",
                      "mtrtyDt": "2029-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 12.0900,
                      "minRedQty": 0.01,
                      "untrRedVal": 946.700000,
                      "minRedVal": 9.470000,
                      "isinCd": "BRSTNCNTF1Q6",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2020-02-10T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 166,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2031",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de juros semestrais).\r\n",
                      "mtrtyDt": "2031-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.\r\n",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.\r\n",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 12.1300,
                      "minRedQty": 0.01,
                      "untrRedVal": 928.100000,
                      "minRedVal": 9.280000,
                      "isinCd": "BRSTNCNTF204",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      },
                      "wdwlDt": "2022-02-24T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 176,
                      "nm": "Tesouro Prefixado com Juros Semestrais 2033",
                      "featrs": "Título prefixado, ou seja, no momento da compra, você já sabe exatamente quanto irá receber no futuro (sempre R$ 1.000 por unidade de título + último pagamento de juros semestrais).",
                      "mtrtyDt": "2033-01-01T00:00:00",
                      "minInvstmtAmt": 36.700000,
                      "untrInvstmtVal": 917.740000,
                      "invstmtStbl": "É mais interessante para quem precisa dos seus rendimentos para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 12.0600,
                      "anulRedRate": 12.1800,
                      "minRedQty": 0.01,
                      "untrRedVal": 911.660000,
                      "minRedVal": 9.120000,
                      "isinCd": "BRSTNCNTF212",
                      "FinIndxs": {
                          "cd": 19,
                          "nm": "PREFIXADO"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 103,
                      "nm": "Tesouro IPCA+ 2024",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2024-08-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é compostos por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento, pois não paga juros semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 6.1800,
                      "minRedQty": 0.01,
                      "untrRedVal": 3546.000000,
                      "minRedVal": 35.460000,
                      "isinCd": "BRSTNCNTB0K5",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-02-10T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 84,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2024",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2024-08-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. ",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 6.1800,
                      "minRedQty": 0.01,
                      "untrRedVal": 3984.740000,
                      "minRedVal": 39.850000,
                      "isinCd": "BRSTNCNTB096",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-01-02T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 170,
                      "nm": "Tesouro IPCA+ 2026",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).\r\n",
                      "mtrtyDt": "2026-08-15T00:00:00",
                      "minInvstmtAmt": 32.150000,
                      "untrInvstmtVal": 3215.270000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento, pois não paga juros semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.\r\n",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.\r\n",
                      "anulInvstmtRate": 5.5600,
                      "anulRedRate": 5.6800,
                      "minRedQty": 0.01,
                      "untrRedVal": 3201.420000,
                      "minRedVal": 32.010000,
                      "isinCd": "BRSTNCNTB4W2",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 156,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2026",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2026-08-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.7000,
                      "minRedQty": 0.01,
                      "untrRedVal": 4034.410000,
                      "minRedVal": 40.340000,
                      "isinCd": "BRSTNCNTB4U6",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-02-10T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 167,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2030",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).\r\n",
                      "mtrtyDt": "2030-08-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. \r\n",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.\r\n",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.7600,
                      "minRedQty": 0.01,
                      "untrRedVal": 4057.420000,
                      "minRedVal": 40.570000,
                      "isinCd": "BRSTNCNTB3B8",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2022-02-24T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 175,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2032",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2032-08-15T00:00:00",
                      "minInvstmtAmt": 40.730000,
                      "untrInvstmtVal": 4073.200000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. ",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 5.7400,
                      "anulRedRate": 5.8600,
                      "minRedQty": 0.01,
                      "untrRedVal": 4038.710000,
                      "minRedVal": 40.390000,
                      "isinCd": "BRSTNCNTB674",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 138,
                      "nm": "Tesouro IPCA+ 2035",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2035-05-15T00:00:00",
                      "minInvstmtAmt": 39.160000,
                      "untrInvstmtVal": 1958.070000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é compostos por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento, pois não paga juros semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 5.7700,
                      "anulRedRate": 5.8900,
                      "minRedQty": 0.01,
                      "untrRedVal": 1930.490000,
                      "minRedVal": 19.300000,
                      "isinCd": "BRSTNCNTB3E2",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 111,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2035",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2035-05-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. ",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.8700,
                      "minRedQty": 0.01,
                      "untrRedVal": 4104.840000,
                      "minRedVal": 41.050000,
                      "isinCd": "BRSTNCNTB0O7",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-02-10T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 168,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2040",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).\r\n",
                      "mtrtyDt": "2040-08-15T00:00:00",
                      "minInvstmtAmt": 41.300000,
                      "untrInvstmtVal": 4130.490000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. \r\n",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.\r\n",
                      "anulInvstmtRate": 5.7000,
                      "anulRedRate": 5.8200,
                      "minRedQty": 0.01,
                      "untrRedVal": 4078.400000,
                      "minRedVal": 40.780000,
                      "isinCd": "BRSTNCNTB3C6",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 160,
                      "nm": "Tesouro IPCA+ 2045",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2045-05-15T00:00:00",
                      "minInvstmtAmt": 33.430000,
                      "untrInvstmtVal": 1114.380000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem pode deixar o dinheiro render até o vencimento do investimento, pois não paga juros semestrais. Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado.",
                      "semiAnulIntrstInd": false,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 5.7900,
                      "anulRedRate": 5.9100,
                      "minRedQty": 0.01,
                      "untrRedVal": 1086.330000,
                      "minRedVal": 10.860000,
                      "isinCd": "BRSTNCNTB2U0",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 93,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2045",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2045-05-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. ",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.9100,
                      "minRedQty": 0.01,
                      "untrRedVal": 4105.950000,
                      "minRedVal": 41.060000,
                      "isinCd": "BRSTNCNTB0A6",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-01-02T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 147,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2050",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).",
                      "mtrtyDt": "2050-08-15T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. ",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.9100,
                      "minRedQty": 0.01,
                      "untrRedVal": 4051.680000,
                      "minRedVal": 40.520000,
                      "isinCd": "BRSTNCNTB3D4",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      },
                      "wdwlDt": "2020-02-10T00:00:00"
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 169,
                      "nm": "Tesouro IPCA+ com Juros Semestrais 2055",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IPCA).\r\n",
                      "mtrtyDt": "2055-05-15T00:00:00",
                      "minInvstmtAmt": 41.770000,
                      "untrInvstmtVal": 4177.340000,
                      "invstmtStbl": "Aumenta o poder de compra do seu dinheiro, pois seu rendimento é composto por uma taxa de juros + a variação da inflação (IPCA). É mais interessante para quem precisa do seu rendimento para complementar sua renda, pois paga juros a cada semestre (cupons de juros). Em caso de resgate antecipado, o Tesouro Nacional garante sua recompra pelo seu valor de mercado. \r\n",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "Indicado para aqueles que querem realizar investimentos de longo prazo.\r\n",
                      "anulInvstmtRate": 5.8000,
                      "anulRedRate": 5.9200,
                      "minRedQty": 0.01,
                      "untrRedVal": 4108.960000,
                      "minRedVal": 41.090000,
                      "isinCd": "BRSTNCNTB4Q4",
                      "FinIndxs": {
                          "cd": 22,
                          "nm": "IPCA"
                      }
                  }
              },
              {
                  "TrsrBd": {
                      "cd": 66,
                      "nm": "Tesouro IGPM+ com Juros Semestrais 2031",
                      "featrs": "Título pós-fixado, uma vez que parte do seu rendimento acompanha a variação da taxa de inflação (IGP-M).",
                      "mtrtyDt": "2031-01-01T00:00:00",
                      "minInvstmtAmt": 0.0,
                      "untrInvstmtVal": 0.0,
                      "invstmtStbl": "",
                      "semiAnulIntrstInd": true,
                      "rcvgIncm": "",
                      "anulInvstmtRate": 0.0,
                      "anulRedRate": 5.7800,
                      "minRedQty": 0.01,
                      "untrRedVal": 9037.520000,
                      "minRedVal": 90.380000,
                      "isinCd": "BRSTNCNTC0K4",
                      "FinIndxs": {
                          "cd": 1,
                          "nm": "IGP-M"
                      },
                      "wdwlDt": "2020-01-02T00:00:00"
                  }
              }
          ],
          "BizSts": {
              "cd": "0",
              "dtTm": "2022-10-24T19:28:24"
          }
      }
  }

    return data;

    // return this.http
    //   .get(`${this.planilhaTesouroDireto}`, {})
    //   .toPromise()
    //   .then((res: any) => res as any)
    //   .catch((error: Response) => error);
  }
}
