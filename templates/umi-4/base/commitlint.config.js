module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: '有新特性',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: 'bug的修复',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: '文档修改',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description:
              '不影响代码逻辑变化的样式变化(white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: '代码的重构,没有修复bug也没有添加功能',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: '性能上的优化',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: '添加新的测试文件或者对原有的测试逻辑进行修改',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description:
              '改变或者添加新的依赖,改变了构建流程(example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description:
              '改变了CI(持续化集成)的配置文件或者脚本 (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: '不影响src和test的其他文件更改',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: '撤销之前的提交',
            title: 'Reverts',
            emoji: '🗑'
          }
        }
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)'
      },
      subject: {
        description: 'Write a short, imperative tense description of the change'
      },
      body: {
        description: 'Provide a longer description of the change'
      },
      isBreaking: {
        description: 'Are there any breaking changes?'
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
      },
      breaking: {
        description: 'Describe the breaking changes'
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?'
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)'
      }
    }
  },
  rules: {
    'subject-case': [0]
  }
}
