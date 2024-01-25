const handleShowPassword = (inputElement: HTMLInputElement) => {
    const { type } = inputElement;
  
    inputElement.type = type === 'password' ? 'text' : 'password';
  };
  
export { handleShowPassword };
  