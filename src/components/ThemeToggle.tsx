import styled from 'styled-components';
import { useTheme } from './ThemeContext';


const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 12px;
  background: var(--note-button-bg);
  border: 1px solid var(--note-border);
  border-radius: 4px;
  cursor: pointer;
  z-index: 100;
`;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
    </ToggleButton>
  );
};