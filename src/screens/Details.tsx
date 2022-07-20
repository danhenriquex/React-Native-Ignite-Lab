import { useRoute } from "@react-navigation/native";
import { VStack } from "native-base";
import { Header } from "../components/Header";

interface Params {
  orderId: string;
}

export function Details() {
  const route = useRoute();

  const {orderId} = route.params as Params;

  console.log(orderId)

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
    </VStack>
  );
}
