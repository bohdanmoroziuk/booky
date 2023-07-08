import { useQuasar, openURL } from 'quasar';

export const useOpenBookmarkUrlController = () => {
  const quasar = useQuasar();

  const handlerError = (...args: unknown[]) => {
    if (args.length) {
      quasar.notify({
        type: 'warning',
        message: 'Unable to open bookmark url',
      });
    }
  };

  const openBookmarkUrl = (url: string) => {
    openURL(
      url,
      handlerError,
      {
        noopener: true,
        noreferrer: true,
      },
    );
  };

  return {
    openBookmarkUrl,
  };
};
