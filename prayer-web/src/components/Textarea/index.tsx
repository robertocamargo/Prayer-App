import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import { Container, Error } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}
const Textarea: React.FC<TextareaProps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!textareaRef.current?.value);
  }, []);
  return (
    <Container
      style={containerStyle}
      isErrorRed={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <textarea
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={textareaRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Textarea;
