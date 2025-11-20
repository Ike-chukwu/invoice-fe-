import { IconSvgProps } from "@/services/generalType";


export const ArrowDownIcon = () => {
  return (
    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1l4.228 4.228L9.456 1"
        stroke="#7C5DFA"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
  );
};

export const PlusIcon = () => {
  return (
    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
        fill="#7C5DFA"
        fill-rule="nonzero"
      />
    </svg>
  );
};
export const ArrowRightIcon = () => {
  return (
    <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1l4 4-4 4"
        stroke="#7C5DFA"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export const ArrowLeftIcon = () => {
  return (
    <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.342.886L2.114 5.114l4.228 4.228"
        stroke="#9277FF"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export const DeleteIcon = (props: any) => {
  return (
    <svg {...props} width="13" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
        fill="#888EB0"
        fill-rule="nonzero"
      />
    </svg>
  );
};

export const LogOutIcon: React.FC<IconSvgProps> = (props) => (
  <svg
    {...props}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 49C10.3833 49 9.28511 48.5434 8.372 47.6303C7.45889 46.7172 7.00156 45.6182 7 44.3333V11.6667C7 10.3833 7.45733 9.28511 8.372 8.372C9.28667 7.45889 10.3849 7.00156 11.6667 7H25.6667C26.3278 7 26.8823 7.224 27.3303 7.672C27.7783 8.12 28.0016 8.67378 28 9.33333C27.9984 9.99289 27.7744 10.5474 27.328 10.997C26.8816 11.4466 26.3278 11.6698 25.6667 11.6667H11.6667V44.3333H25.6667C26.3278 44.3333 26.8823 44.5573 27.3303 45.0053C27.7783 45.4533 28.0016 46.0071 28 46.6667C27.9984 47.3262 27.7744 47.8808 27.328 48.3303C26.8816 48.7799 26.3278 49.0031 25.6667 49H11.6667ZM40.075 30.3333H23.3333C22.6722 30.3333 22.1184 30.1093 21.672 29.6613C21.2256 29.2133 21.0016 28.6596 21 28C20.9984 27.3404 21.2224 26.7867 21.672 26.3387C22.1216 25.8907 22.6753 25.6667 23.3333 25.6667H40.075L35.7 21.2917C35.2722 20.8639 35.0583 20.3389 35.0583 19.7167C35.0583 19.0944 35.2722 18.55 35.7 18.0833C36.1278 17.6167 36.6722 17.3732 37.3333 17.353C37.9944 17.3328 38.5583 17.5568 39.025 18.025L47.3667 26.3667C47.8333 26.8333 48.0667 27.3778 48.0667 28C48.0667 28.6222 47.8333 29.1667 47.3667 29.6333L39.025 37.975C38.5583 38.4417 38.0046 38.6657 37.3637 38.647C36.7228 38.6283 36.1682 38.3849 35.7 37.9167C35.2722 37.45 35.0684 36.8962 35.0887 36.2553C35.1089 35.6144 35.3321 35.0793 35.7583 34.65L40.075 30.3333Z"
      fill="currentColor"
    />
  </svg>
);
