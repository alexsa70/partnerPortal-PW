---
name: subagent-orchestration
description: Orchestrates planner → worker → code reviewer for large or multi-task work. Use when the user gives a large complex task, a list of tasks, or a multi-step effort that should be planned first, then each task implemented by a worker and reviewed until all tasks are done.
---

# Subagent Orchestration (Planner → Worker → Reviewer, per task)

When the user provides a **large complex task**, a **list of tasks**, or a **multi-step effort**, run this orchestration. Use the `mcp_task` tool with `subagent_type` set to `"planner"`, `"worker"`, or `"code-reviewer"` as described below.

## High-level flow

```
User request → Planner (plan + task files) → For each task: Worker → Code reviewer → [Worker again if fixes needed] → Next task → Done when all tasks complete
```

## Step 1: Run the planner

- Invoke the **planner** subagent (`subagent_type: "planner"`) with the user’s overall goal, constraints, and any list of tasks they provided.
- The planner produces:
  - A **plan overview** (e.g. `PLAN.md` or under `.cursor/plans/`) with goal, scope, and an **ordered list of subtasks** (by ID/title).
  - **One file per subtask** (e.g. under `.cursor/plans/subtasks/` or `.cursor/plans/<task-name>/`) with purpose, acceptance criteria, relevant paths, dependencies, and scope.
- Wait for the planner to finish. Do not start implementation until the plan and subtask files exist.

## Step 2: Discover tasks from the plan

- Read the plan overview to get the **ordered list of subtask IDs/titles**.
- Resolve each subtask to its description file (e.g. `01-setup-api.md`, `02-add-auth.md`). Use the plan’s stated paths and naming (e.g. `.cursor/plans/subtasks/`).
- Execute subtasks **in plan order** so dependencies are respected.

## Step 3: For each task – implement and review (iterative)

For **each** subtask, in order:

### 3a. Worker (implement)

- Invoke the **worker** subagent (`subagent_type: "worker"`) with a **self-contained task description** for this subtask. Include:
  - Subtask ID and title
  - Purpose and acceptance criteria (from the subtask file)
  - Relevant paths and scope
  - Any dependency context (e.g. “subtask 01 is already done”)
- Wait for the worker to complete before calling the reviewer.

### 3b. Code reviewer (review)

- Invoke the **code reviewer** subagent (`subagent_type: "code-reviewer"`) and pass context: which subtask was implemented, which files or areas were changed.
- The reviewer will run git diff and focus on modified files, and report:
  - **Critical errors** (bugs, incorrect behavior)
  - **Flaws** (security, maintainability, correctness)
  - **Optimization opportunities** (performance, clarity, structure)

### 3c. Worker again (fixes from review, when needed)

- If the reviewer reported **critical errors**, **flaws**, or **optimizations** that should be applied:
  - Invoke the **worker** again with a task to implement **all** of the reviewer’s suggestions (list or summarize them).
- After the worker completes, you may optionally run the code reviewer again for that subtask; otherwise treat the subtask as done and move to the next one.

### 3d. Next task

- Repeat 3a–3c for the next subtask in the plan order.
- Continue until **all** subtasks are completed.

## Summary

| Phase        | Subagent     | When / What |
|-------------|--------------|-------------|
| Plan        | `planner`    | Once at start; produces plan + per-task files. |
| Implement   | `worker`     | Once per task (and again if reviewer finds issues). |
| Review      | `code-reviewer` | Once per task after worker (optional second pass after fixes). |

## Notes

- **Planner first**: Do not invoke worker or code reviewer until the planner has produced the plan and subtask files.
- **Order**: Always execute subtasks in the order given by the plan (dependencies are encoded there).
- **Task descriptions**: Keep each subagent task description clear and self-contained so subagents can run without re-reading the full chat.
- For a **single** development task (no plan needed), use the **subagent-workflow** skill instead (worker → reviewer → worker).
