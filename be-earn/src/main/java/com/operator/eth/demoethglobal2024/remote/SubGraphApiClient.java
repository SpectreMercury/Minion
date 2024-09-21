//package com.operator.eth.demoethglobal2024.remote;
//
//import com.opencsv.CSVWriter;
//import com.operator.eth.demoethglobal2024.remote.dto.PoolDto;
//import graphql.GraphQL;
//import graphql.language.OperationDefinition;
//import graphql.parser.Parser;
//import graphql.schema.GraphQLSchema;
//import graphql.schema.idl.SchemaParser;
//import graphql.schema.idl.TypeDefinitionRegistry;
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.io.BufferedReader;
//import java.util.ArrayList;
//import java.util.List;
//
//public class SubGraphApiClient {
//    private static final String UNISWAP_ENDPOINT = "https://gateway.thegraph.com/api/b545a02e35e50d37cdbcf462354bf12c/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";
//    private static final String QUERY = "query getPools($first: Int, $skip: Int) { pools(first: $first, skip: $skip) { id token0 { id symbol name } token1 { id symbol name } feeTier liquidity sqrtPrice feesUSD totalValueLockedUSD volumeUSD } }";
//
//    public static void main(String[] args) {
//        try {
//            fetchUniswapPools(10);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    private static void fetchUniswapPools(int batchSize) throws IOException {
//        int skip = 0;
//        List<PoolD> allPools = new ArrayList<>();
//
//        try (CSVWriter writer = new CSVWriter(new FileWriter("/Users/aaron/Documents/work/dao/ethglobal/output.csv"))) {
//            String[] header = {"poolAddress", "token0Address", "token0Symbol", "token1Address", "token1Symbol", "feeTier", "liquidity", "sqrtPrice", "apy", "totalValueLockedUSD", "volumeUSD", "dailyFees"};
//            writer.writeNext(header);
//
//            while (allPools.size() < 100) {
//                String response = makeGraphQLRequest(batchSize, skip);
//                List<PoolDto> poolList = parseResponse(response);
//
//                if (poolList.isEmpty()) {
//                    break; // Exit loop if no more data
//                }
//
//                allPools.addAll(poolList);
//                System.out.println("已获取 " + allPools.size() + " 条记录");
//
//                for (PoolDto pool : poolList) {
//                    String[] csvData = {
//                            pool.getId(),
//                            pool.getToken0().getId(),
//                            pool.getToken0().getSymbol(),
//                            pool.getToken1().getId(),
//                            pool.getToken1().getSymbol(),
//                            String.valueOf(pool.getFeeTier()),
//                            String.valueOf(pool.getLiquidity()),
//                            String.valueOf(pool.getSqrtPrice()),
//                            String.valueOf(Double.parseDouble(pool.getTotalValueLockedUSD()) > 0 ? ((Double.parseDouble(pool.getFeesUSD()) / 7) * 365 / pool.getTotalValueLockedUSD()) * 100 : 0),
//                            String.valueOf(pool.getTotalValueLockedUSD()),
//                            String.valueOf(Double.parseDouble(pool.getFeesUSD()) / 7)
//                    };
//                    writer.writeNext(csvData);
//                }
//                skip += batchSize;
//            }
//            System.out.println("总共获取的池子数量: " + allPools.size());
//        }
//    }
//
//    private static String makeGraphQLRequest(int first, int skip) throws IOException {
//        CloseableHttpClient client = HttpClients.createDefault();
//        HttpGet request = new HttpGet(UNISWAP_ENDPOINT + "?query=" + QUERY.replace("$first", String.valueOf(first)).replace("$skip", String.valueOf(skip)));
//        CloseableHttpResponse response = client.execute(request);
//
//        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()))) {
//            StringBuilder result = new StringBuilder();
//            String line;
//            while ((line = reader.readLine()) != null) {
//                result.append(line);
//            }
//            return result.toString();
//        }
//    }
//
//    private static List<PoolDto> parseResponse(String response) {
//        // Implement JSON parsing to convert response into List<Pool>
//        // This method needs a JSON library like Jackson or Gson to parse the response.
//        return new ArrayList<>(); // Placeholder
//    }
//
//    // Define Pool and Token classes here according to your data structure
//}
