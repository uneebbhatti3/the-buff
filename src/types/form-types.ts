export type HandleOnChange =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | {
      target: {
        name: string;
        value: string;
      };
    };

export type HandleOnSubmit = React.FormEvent<HTMLFormElement>;
