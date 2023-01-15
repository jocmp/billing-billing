interface Props {
  id: string;
  label: string;
}

export function TextInput({ id, label }: Props) {
  return (
    <div className="text-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type="text" />
    </div>
  );
}
