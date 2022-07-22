import {
  Button as NativeBaseButton,
  IIconButtonProps,
  Heading,
} from "native-base";

type Props = IIconButtonProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <NativeBaseButton
      {...rest}
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{
        bg: "green.500",
      }}
      isLoading={isLoading}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
