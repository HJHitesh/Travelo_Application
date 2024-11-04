import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { TextInputProps } from "@mantine/core";

const SearchBar = (props: TextInputProps) => {
  return (
    <TextInput
      leftSection={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      mt={40}
      placeholder="Search for a touristic package"
      {...props}
    />
  );
};

export default SearchBar;
