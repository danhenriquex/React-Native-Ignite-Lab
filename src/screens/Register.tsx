import { useState } from "react";
import { VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

type Solicitation = {
  patrimony: string;
  description: string;
};

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [solicitation, setSolicitation] = useState<Solicitation>(
    {} as Solicitation
  );

  const navigation = useNavigation();

  function handleNewOrder() {
    if (!solicitation.description || !solicitation.patrimony) {
      return Alert.alert("Atenção", "Preencha todos os campos");
    }

    firestore()
      .collection("orders")
      .add({
        ...solicitation,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Sucesso", "Solicitação enviada com sucesso");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert("Erro", "Erro ao enviar solicitação");
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do Patrimônio"
        mt={4}
        onChangeText={(e) =>
          setSolicitation((prevState) => ({ ...prevState, patrimony: e }))
        }
      />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        onChangeText={(e) =>
          setSolicitation((prevState) => ({ ...prevState, description: e }))
        }
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleNewOrder}
        isLoading={isLoading}
      />
    </VStack>
  );
}
