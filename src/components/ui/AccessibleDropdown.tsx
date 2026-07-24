import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
}

interface AccessibleDropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onSelect: (option: DropdownOption) => void;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({
  options,
  value,
  placeholder = "Select an option",
  onSelect,
  label,
  error,
  disabled = false,
  required = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter(
      option =>
        option.label.toLowerCase().includes(normalizedQuery) ||
        option.description?.toLowerCase().includes(normalizedQuery)
    );
  }, [options, searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          const option = filteredOptions[focusedIndex];
          if (!option.disabled) {
            onSelect(option);
            setIsOpen(false);
            setFocusedIndex(-1);
            setSearchQuery('');
          }
        }
        break;
      
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchQuery('');
        triggerRef.current?.focus();
        break;
      
      case 'Home':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(0);
        }
        break;
      
      case 'End':
        event.preventDefault();
        if (isOpen) {
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;
      
      default:
        // Type-ahead search
        if (event.key.length === 1 && isOpen) {
          setSearchQuery(prev => prev + event.key);
          setFocusedIndex(0);
          
          // Clear search after 1 second of no typing
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          searchTimeoutRef.current = setTimeout(() => {
            setSearchQuery('');
          }, 1000);
        }
        break;
    }
  }, [isOpen, focusedIndex, filteredOptions, onSelect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleOptionClick = (option: DropdownOption) => {
    if (!option.disabled) {
      onSelect(option);
      setIsOpen(false);
      setFocusedIndex(-1);
      setSearchQuery('');
    }
  };

  const generatedId = useId();
  const dropdownId = `dropdown-${generatedId}`;
  const labelId = `${dropdownId}-label`;
  const listId = `${dropdownId}-list`;

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      <label
        id={labelId}
        htmlFor={dropdownId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Trigger button */}
      <button
        ref={triggerRef}
        id={dropdownId}
        type="button"
        className={`relative w-full bg-white border rounded-lg px-4 py-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300'
        } ${
          disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'hover:border-gray-400 cursor-pointer'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
        aria-describedby={error ? `${dropdownId}-error` : undefined}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </span>
      </button>

      {/* Error message */}
      {error && (
        <p id={`${dropdownId}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Search query indicator */}
      {searchQuery && isOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-50 border-x border-gray-300 px-4 py-2 text-sm text-blue-700 z-50">
          Searching for: "{searchQuery}"
        </div>
      )}

      {/* Dropdown list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-40 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              className="py-1"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-gray-500 text-sm">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.id}
                    role="option"
                    aria-selected={option.value === value}
                    aria-disabled={option.disabled}
                    className={`relative cursor-pointer select-none px-4 py-2 ${
                      option.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : index === focusedIndex
                        ? 'bg-blue-100 text-blue-900'
                        : option.value === value
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-500">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {option.value === value && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions for screen readers */}
      <div className="sr-only">
        Use arrow keys to navigate options, Enter or Space to select, 
        Escape to close, and type to search.
      </div>
    </div>
  );
};
