---
name: subagent-workflow
description: Orchestrates worker-then-reviewer-then-worker subagent flow for development tasks. Use when the user requests implementation, creation, features, bug fixes, refactors, or any hands-on development work that should be implemented by a worker and then reviewed before final fixes.
---

# Subagent Workflow (Worker → Reviewer → Worker)

When an agent receives a task for **implementation**, **creation**, or any other **development task**, follow this workflow. Use the `mcp_task` tool with the appropriate `subagent_type`.

## Workflow Steps

### 1. Launch the worker first

- Invoke the **worker** subagent (`subagent_type: "worker"`) with a clear, detailed task description (requirements, scope, and any context the worker needs).
- Wait for the worker to complete. Do not proceed to review until the worker has finished.

### 2. Launch the code reviewer

- After the worker completes, invoke the **code reviewer** subagent (`subagent_type: "code-reviewer"`) to check the quality of the worker’s changes.
- Pass enough context so the reviewer knows what was implemented (e.g. which files or area of the codebase changed). The reviewer will run git diff and focus on modified files.

### 3. Reviewer writes findings

- The code reviewer must **write** about:
  - **Critical errors** (bugs, incorrect behavior)
  - **Flaws** (security, maintainability, correctness)
  - **Optimization opportunities** (performance, clarity, structure)
- If there are no critical issues or meaningful optimizations, the workflow can stop after this step.

### 4. Re-launch the worker for fixes (when needed)

- If the code reviewer reported **critical errors**, **flaws**, or **optimization opportunities** that should be addressed:
  - Launch the **worker** again (`subagent_type: "worker"`) with a task that explicitly asks to implement **all** of the reviewer’s suggestions (list them or summarize them in the task).
- After the worker completes the fixes, you may optionally run the code reviewer again to confirm issues are resolved; otherwise consider the workflow complete.

## Summary

```
Task received → Worker (implement) → Code reviewer (review) → [If findings] → Worker (apply reviewer suggestions) → Done
```

## Notes

- Always **worker first**, then **reviewer**. Never run the reviewer before the worker for a new development task.
- The second worker run is only required when the reviewer has concrete, actionable findings to implement.
- Keep task descriptions to subagents specific and self-contained so they can run without re-reading the full conversation.
