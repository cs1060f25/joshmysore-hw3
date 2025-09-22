import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

export default function NotImplemented() {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState('');

  useEffect(() => {
    const handleNotImplemented = (event: CustomEvent) => {
      setFeature(event.detail.feature);
      setIsOpen(true);
    };

    window.addEventListener('not-implemented', handleNotImplemented as EventListener);
    return () => {
      window.removeEventListener('not-implemented', handleNotImplemented as EventListener);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Not Implemented Yet</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600">
            {feature ? `"${feature}"` : 'This feature'} is not implemented in this prototype.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a demonstration of the user interface and flow.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
