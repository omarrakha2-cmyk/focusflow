# Task Manager with Pomodoro - Specification

## Project Overview
- **Project Name**: FocusFlow - Task Manager & Pomodoro
- **Type**: Single-page productivity web app
- **Core Functionality**: Task management with Pomodoro timer, Apple/macOS aesthetic
- **Target Users**: Productivity-focused individuals seeking a clean, distraction-free task manager

## UI/UX Specification

### Layout Structure
- **Container**: Centered, max-width 680px, generous padding
- **Page Sections**:
  - Top bar: Clock (left), Dark mode toggle (right)
  - Main card: macOS window chrome (red/yellow/green dots)
  - Task input section
  - Filter tabs + task count
  - Task list (scrollable)
  - Pomodoro timer panel (below or integrated)
  - Motivational quote footer

### Responsive Breakpoints
- Desktop: > 768px - Full layout
- Mobile: <= 768px - Stacked layout, smaller fonts

### Visual Design

#### Color Palette
- **Background**: #f5f5f7 (light) / #1d1d1f (dark)
- **Card Background**: rgba(255, 255, 255, 0.8) (light) / rgba(30, 30, 30, 0.8) (dark)
- **Text Primary**: #1d1d1f (light) / #f5f5f7 (dark)
- **Text Secondary**: #86868b
- **Accent**: #0071e3 (Apple blue)
- **Priority High**: #ff3b30
- **Priority Medium**: #ff9500
- **Priority Low**: #34c759
- **Window Dots**: #ff5f57, #febc2e, #28c840
- **Completed Task**: #86868b

#### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', sans-serif
- **Clock**: 48px, font-weight 300 (light)
- **Date**: 14px, font-weight 400
- **Card Title**: 20px, font-weight 600
- **Task Text**: 15px, font-weight 400
- **Tags**: 11px, font-weight 500, uppercase

#### Spacing System
- **Card Padding**: 24px
- **Card Border Radius**: 20px
- **Input Padding**: 14px 18px
- **Task Item Padding**: 14px 16px
- **Task Border Radius**: 12px
- **Gap between elements**: 16px

#### Visual Effects
- **Frosted Glass**: backdrop-filter: blur(20px)
- **Card Shadow**: 0 8px 32px rgba(0, 0, 0, 0.08)
- **Hover Shadow**: 0 12px 40px rgba(0, 0, 0, 0.12)
- **Transitions**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Components

#### Clock
- Digital display: HH:MM:SS
- Date below: "Friday, March 13"
- Position: Top-left of main card

#### Dark Mode Toggle
- Icon: Moon (light mode) / Sun (dark mode)
- Position: Top-right corner
- Smooth icon transition

#### Task Input
- Placeholder: "Add a new task…"
- + button on right
- Priority selector dropdown (High/Medium/Low)
- Due date picker (optional)
- Border: 1px solid rgba(0, 0, 0, 0.1)
- Focus: blue border glow

#### Task Item
- Checkbox (custom styled, Apple-like)
- Task text (strikethrough when complete)
- Priority tag with colored left border
- Due date (if set)
- Delete button (appears on hover)
- Drag handle (left side)
- Priority colors:
  - High: #ff3b30 (red)
  - Medium: #ff9500 (orange)
  - Low: #34c759 (green)

#### Filter Tabs
- Options: All | Active | Completed
- Active tab: blue underline
- Task count badge on right

#### Pomodoro Timer
- Circular SVG progress ring (120px diameter)
- Time display in center
- Mode buttons: Focus | Short Break | Long Break
- Controls: Play/Pause, Reset
- Session counter: "Session X of 4"
- Ring color changes based on mode:
  - Focus: #0071e3
  - Short Break: #34c759
  - Long Break: #af52de

#### Motivational Quote
- Random quote from array
- Fade transition on change
- Position: Bottom of card

## Functionality Specification

### Task Manager
- Add task with Enter key or + button
- Toggle task completion with checkbox
- Delete task with X button
- Filter tasks: All / Active / Completed
- Drag-and-drop reordering
- Search/filter tasks by typing
- localStorage persistence
- Keyboard shortcuts:
  - Enter: Add task
  - Escape: Clear input
  - Delete: Remove completed tasks

### Pomodoro Timer
- 25 min focus, 5 min short break, 15 min long break
- Play/Pause/Reset controls
- Visual progress ring
- Audio notification on session end (optional beep)
- Browser notification on session end
- Auto-switch to break after focus
- Track sessions (4 focus sessions = 1 cycle)

### Dark Mode
- Toggle via icon
- Preference saved in localStorage
- Smooth transition between modes

### Data Persistence
- Tasks saved to localStorage key: "focusflow_tasks"
- Dark mode preference: "focusflow_darkmode"
- Pomodoro sessions: "focusflow_sessions"

## Acceptance Criteria
1. Clock updates every second
2. Tasks can be added, completed, deleted
3. Tasks persist after page refresh
4. Drag-and-drop reordering works
5. Pomodoro timer counts down correctly
6. Browser notification fires on timer end
7. Dark mode toggles correctly
8. Filter tabs show correct task subsets
9. All animations are smooth
10. Works on mobile devices
