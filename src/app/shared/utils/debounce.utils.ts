export function debounce<T extends (...args: any[]) => any>(
    func: T, 
    wait: number = 300
  ): (...args: Parameters<T>) => void {
    let timeout: any = null;
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }