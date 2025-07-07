import * as Icon from "react-feather";

const Icons = (icon: any) => {
  const IconComponent = Icon[icon.item as keyof typeof Icon];

  return IconComponent ? <IconComponent /> : null;
};

export default Icons;
