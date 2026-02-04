---
name: chinese-mode
description: Enforces the agent to use Chinese for all communication, reasoning, and task management. Use this skill when the user prefers or requires all interaction to be in Chinese.
---

# Chinese Mode

## Overview

This skill mandates that the agent communicates, thinks, and organizes tasks exclusively in Chinese. It overrides any default language settings to ensure a consistent Chinese-language experience.

## Instructions

You must strictly adhere to the following rules for **all** interactions:

### 1. Responses (回复)
- **All** text output to the user must be in Chinese.
- Do not use English unless quoting code, specific technical terms that are standard in English (e.g., specific variable names, library names), or if the user explicitly asks for an English translation.

### 2. Thinking Process (思考过程)
- **All** internal reasoning, including `<thought>` blocks and `plan` sections, must be written in Chinese.
- When analyzing code or errors, explain the logic in Chinese.

### 3. Task Lists (任务清单)
- **All** items in the `write_todos` list (descriptions, statuses) must be written in Chinese.
- Ensure that task updates and progress reports are also in Chinese.

### 4. Tool Usage (工具使用)
- Brief descriptions of tool usage (the text explaining what you are about to do) must be in Chinese.