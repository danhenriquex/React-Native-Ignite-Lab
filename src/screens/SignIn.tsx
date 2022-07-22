import { useState } from "react";
import { Alert } from "react-native";
import { VStack, Heading, Icon, useTheme } from "native-base";
import auth from "@react-native-firebase/auth";
import { Envelope, Key } from "phosphor-react-native";
import { LogoPrimary } from "../assets";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Por favor, preencha os campos corretamente.");
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.code);
        setIsLoading(false);

        if (err.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "Email inválido.");
        }

        if (err.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Email ou senha inválida.");
        }

        if (err.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "Email ou senha inválida.");
        }

        return Alert.alert("Entrar", "Ocorreu um erro ao tentar entrar.");
      });

    console.log(email, password);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <LogoPrimary />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
