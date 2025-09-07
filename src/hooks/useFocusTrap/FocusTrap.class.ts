class FocusTrapManager {
  private containers: HTMLElement[] = [];

  add(container: HTMLElement | null) {
    const ignoreContainer = !container || this.containers.includes(container);
    if (ignoreContainer) return;

    this.containers.push(container);
  }

  remove(container: HTMLElement | null) {
    this.containers.filter(
      (existingContainer) => existingContainer !== container,
    );
  }

  isTop(container: HTMLElement | null) {
    return this.containers.at(-1) === container;
  }
}

export const focusTrapManager = new FocusTrapManager();
