function useIsMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return {
    isMobile,
  };
}

export default useIsMobile;
