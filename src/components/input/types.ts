export interface InputProps {
  name: string;
  onChange: (key: string, value: unknown) => void;
  value: unknown;
}