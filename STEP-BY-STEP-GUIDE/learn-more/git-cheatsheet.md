# Git Commands Cheat Sheet

## Initial Setup & Configuration

### User Configuration
```bash
# Set your name and email (required for commits)
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Verify your configuration
git config --global user.name
git config --global user.email

# View all configuration
git config --list
git config --global --list
```

### Essential Configuration
```bash
# Set default branch name to 'main'
git config --global init.defaultBranch main

# Set default editor (VS Code example)
git config --global core.editor "code --wait"

# Enable colored output
git config --global color.ui auto

# Set default merge behavior
git config --global pull.rebase false
```

### Useful Aliases
```bash
# Basic shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# Advanced shortcuts
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Pretty log formats
git config --global alias.lg "log --oneline --decorate --all --graph"
git config --global alias.lol "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Useful workflow aliases
git config --global alias.ac '!git add -A && git commit -m'
git config --global alias.save '!git add -A && git commit -m "SAVEPOINT"'
git config --global alias.wip '!git add -u && git commit -m "WIP"'
git config --global alias.undo 'reset HEAD~1 --mixed'
git config --global alias.amend 'commit -a --amend'
git config --global alias.wipe '!git add -A && git commit -qm "WIPE SAVEPOINT" && git reset HEAD~1 --hard'

# Branch management
git config --global alias.bclean "!f() { git branch --merged ${1-master} | grep -v " ${1-master}$" | xargs -r git branch -d; }; f"
git config --global alias.bdone "!f() { git checkout ${1-master} && git up && git bclean ${1-master}; }; f"

# Remote shortcuts
git config --global alias.up 'pull --rebase --autostash'
git config --global alias.cm 'commit -m'
git config --global alias.pushf 'push --force-with-lease'
```

### Project-Specific Configuration
```bash
# Set configuration for current repository only (remove --global)
git config user.name "Project Specific Name"
git config user.email "project@example.com"

# Useful for school vs work vs personal projects
```

## Basic Commands

- `git help [command]` - Get help for a command
- `git status [--short/-s]` - Show repository status
- `git log [--oneline]` - Show commit history
- `git diff` - Show changes in working directory

## Create & Clone

- `git init [dir]` - Create new repository
- `git clone [url]` - Clone remote repository
- `git clone [url] [dir]` - Clone to specific directory
- `--recursive` - Include submodules

## Staging & Committing

### Tracking Files
- `git add [file]` - Add specific file to staging
- `git add .` - Add all files to staging
- `git add -A` - Add all files (including deletions)
- `git add -u` - Add modified files only
- `git rm [file]` - Remove file
- `git mv [old] [new]` - Move/rename file

### Committing
- `git commit -m "message"` - Commit with message
- `git commit -am "message"` - Add and commit modified files
- `git commit --amend` - Amend last commit
- `git commit --amend -m "new message"` - Amend with new message

## Branching & Merging

### Branch Management
- `git branch` - List branches
- `git branch [branch]` - Create branch
- `git branch -d [branch]` - Delete branch
- `git branch -D [branch]` - Force delete branch
- `git checkout [branch]` - Switch to branch
- `git checkout -b [branch]` - Create and switch to branch
- `git switch [branch]` - Switch to branch (Git 2.23+)
- `git switch -c [branch]` - Create and switch to branch (Git 2.23+)

### Merging
- `git merge [branch]` - Merge branch into current
- `git merge --no-ff [branch]` - Merge without fast-forward
- `git rebase [branch]` - Rebase current branch onto branch

## Remote Repositories

### Managing Remotes
- `git remote -v` - List remotes
- `git remote add [name] [url]` - Add remote repository
- `git remote rm [name]` - Remove remote
- `git remote rename [old] [new]` - Rename remote

### Synchronizing
- `git fetch [remote]` - Fetch from remote
- `git pull [remote] [branch]` - Pull from remote
- `git pull --rebase` - Pull with rebase
- `git push [remote] [branch]` - Push to remote
- `git push -u [remote] [branch]` - Push and set upstream
- `git push --all` - Push all branches
- `git push origin --delete [branch]` - Delete remote branch

## Undoing Changes

### Working Directory
- `git checkout [file]` - Restore file from last commit
- `git restore [file]` - Restore file (Git 2.23+)
- `git clean -f` - Remove untracked files
- `git clean -fd` - Remove untracked files and directories

### Staging Area
- `git reset [file]` - Unstage file
- `git reset` - Unstage all files
- `git restore --staged [file]` - Unstage file (Git 2.23+)

### Commits
- `git reset --soft HEAD~1` - Undo last commit, keep changes staged
- `git reset --mixed HEAD~1` - Undo last commit, unstage changes
- `git reset --hard HEAD~1` - Undo last commit, discard changes
- `git revert [commit]` - Create new commit that undoes changes

## Viewing Information

### Status & History
- `git status` - Show working tree status
- `git log` - Show commit history
- `git log --oneline` - Compact commit history
- `git log --graph --all` - Visual branch history
- `git show [commit]` - Show specific commit
- `git blame [file]` - Show who changed each line

### Differences
- `git diff` - Show unstaged changes
- `git diff --staged` - Show staged changes
- `git diff [commit1] [commit2]` - Compare commits
- `git diff [branch1]..[branch2]` - Compare branches

## Stashing

- `git stash` - Stash current changes
- `git stash save "message"` - Stash with message
- `git stash list` - List stashes
- `git stash pop` - Apply and remove latest stash
- `git stash apply` - Apply latest stash (keep in stash)
- `git stash drop` - Delete latest stash
- `git stash clear` - Delete all stashes

## Merge Conflicts

### Resolving Conflicts
- `git status` - See conflicted files
- `git diff` - Show conflict details
- `git mergetool` - Launch merge tool
- `git add [resolved-file]` - Mark conflict as resolved
- `git commit` - Complete merge after resolving

### Conflict Information
- `git log --merge` - Show commits involved in conflict
- `git diff --base [file]` - Show differences from common ancestor
- `git diff --ours [file]` - Show our changes
- `git diff --theirs [file]` - Show their changes

## Advanced Commands

### Maintenance
- `git gc` - Garbage collection
- `git fsck` - File system check
- `git reflog` - Show reference log
- `git cherry-pick [commit]` - Apply specific commit

### Tagging
- `git tag` - List tags
- `git tag [name]` - Create lightweight tag
- `git tag -a [name] -m "message"` - Create annotated tag
- `git push origin [tag]` - Push tag to remote
- `git push origin --tags` - Push all tags

## Workflow Examples

### Feature Branch Workflow
```bash
# Start new feature
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature

# Merge back to main
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main
git branch -d feature/new-feature
```

### Quick Save & Restore
```bash
# Using aliases (after setup above)
git save           # Quick save all changes
git wip            # Work in progress commit
git undo           # Undo last commit but keep changes
git wipe           # Nuclear option - lose all changes
```

## Command Flow Overview

```
Working Directory → Staging Area → Local Repository → Remote Repository
        ↓                ↓              ↓              ↓
    git add          git commit     git push      collaboration
        ↑                ↑              ↑              ↑
   git restore   git reset/restore  git pull      git fetch
```

## Local Repository Structure

- **Working Directory** - Your current files
- **Staging Area** (Index) - Files ready to commit
- **Local Repository** (.git directory) - Your local commits
- **Remote Repository** - Shared repository (GitHub, etc.)

---

## Quick Reference for Movie Search App Project

### Daily Git Workflow
```bash
# Start of day
git status
git pull origin main

# During development
git add .
git commit -m "feat: add search functionality"
git push origin main

# End of milestone
git tag v1.0
git push origin v1.0
```

### Recommended Commit Messages
```bash
git commit -m "feat: add movie search component"
git commit -m "fix: handle API error states"
git commit -m "style: improve responsive layout"
git commit -m "test: add unit tests for search hook"
git commit -m "docs: update README with setup instructions"
```

---

*Note: Replace items in [brackets] with your specific values. Always configure your user name and email before making commits!*