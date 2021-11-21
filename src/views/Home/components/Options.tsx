/** Options.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { usePdf } from "context/PdfProvider";
import { useToast } from "native-base";
import { useTranslation } from "react-i18next";
import {
  Box,
  Checkbox,
  FormControl,
  Text,
  Radio,
  Select,
  TextField,
  Input,
  HStack,
  Button,
} from "native-base";

// ========== propsTypes ========== //
export type propsTypes = {
  onSave: () => void;
};

/** MainFunction */
let Options: React.FC<propsTypes> = (props) => {
  let { Pdf, dispatchPdf } = usePdf();

  /** @kind: Props */
  let [options, setOptions] = React.useState<OptionsType>(Pdf.options);

  let toast = useToast();

  let { t } = useTranslation("translation", { keyPrefix: "home.optionsPage" });

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1} justifyContent={"space-between"}>
      <FormControl p={2}>
        <FormControl.Label>{t`imageSlice`}</FormControl.Label>
        <Radio.Group
          name="imageType"
          value={options.imageType}
          onChange={(nextValue) => {
            setOptions({
              ...options,
              imageType: nextValue as "without" | "slice",
            });
          }}
        >
          <Radio value="slice" colorScheme="red">
            {t`sliceImageInPages`}
          </Radio>
          <Radio value="without" mt={1} colorScheme="red">
            {t`withoutSlice`}
          </Radio>
        </Radio.Group>
      </FormControl>
      <FormControl p={2}>
        <FormControl.Label>{t`imageSizeType`}</FormControl.Label>
        <Select
          defaultValue={"fixed"}
          selectedValue={options.imageSizeType}
          onValueChange={(e) => {
            setOptions({
              ...options,
              imageSizeType: e as "fixed" | "normal" | "fullPage",
            });
          }}
        >
          <Select.Item value={"fixed"} label={t`fixImageSize`}></Select.Item>
          <Select.Item value={"fullPage"} label={t`fullPage`}></Select.Item>
          <Select.Item
            value={"normal"}
            label={t`normalImageSize`}
          ></Select.Item>
        </Select>
      </FormControl>
      <FormControl p={2}>
        <FormControl.Label>{t`imagePadding`}</FormControl.Label>
        <HStack alignItems="center" space={1}>
          <Box flex={1}>
            <FormControl>
              <FormControl.Label>{t`left`}</FormControl.Label>
              <Input
                placeholder="0px"
                value={options.imagePadding.left}
                onChangeText={(e) => {
                  setOptions({
                    ...options,
                    imagePadding: { ...options.imagePadding, left: e },
                  });
                }}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormControl.Label>{t`top`}</FormControl.Label>
              <Input
                placeholder="0px"
                value={options.imagePadding.top}
                onChangeText={(e) => {
                  setOptions({
                    ...options,
                    imagePadding: { ...options.imagePadding, top: e },
                  });
                }}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormControl.Label>{t`right`}</FormControl.Label>
              <Input
                placeholder="0px"
                value={options.imagePadding.right}
                onChangeText={(e) => {
                  setOptions({
                    ...options,
                    imagePadding: { ...options.imagePadding, right: e },
                  });
                }}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormControl.Label>{t`bottom`}</FormControl.Label>
              <Input
                placeholder="0px"
                value={options.imagePadding.bottom}
                onChangeText={(e) => {
                  setOptions({
                    ...options,
                    imagePadding: { ...options.imagePadding, bottom: e },
                  });
                }}
              />
            </FormControl>
          </Box>
        </HStack>
      </FormControl>
      <Box>
        <Button
          colorScheme="success"
          height={55}
          borderRadius={0}
          onPress={() => {
            dispatchPdf({ type: "setOptions", payload: options });
            toast.show({
              title: "Options saved",
              status: "success",
              description: "The options save for you PDF",
              color: "success.500",
            });
            props.onSave();
          }}
        >
          {t`save`}
        </Button>
      </Box>
    </Box>
  );
};

export default Options;
