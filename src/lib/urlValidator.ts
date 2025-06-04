export function isValidUrl(url: string): boolean {
  // Basic URL pattern
  const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  
  try {
    // First check if it matches our basic pattern
    if (!urlPattern.test(url)) {
      return false;
    }
    
    // Then try to construct a URL object (this will catch more edge cases)
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
} 