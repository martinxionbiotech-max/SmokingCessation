# SmokingCessationHub — 夜间执行方案（2026-11）

状态：已批准，按夜间任务逐项执行。  
仓库：`/root/.openclaw/workspace/repos/SmokingCessation`  
数据站：`/root/.openclaw/workspace/repos/data.SmokingCessation`  
执行窗口：每天 02:00–07:30 Asia/Shanghai  
检查点：`docs/nightly-progress.md`

## 1. 目标

把当前 219 页、平均 183 词/页的站点，逐步改成：

- 可索引页面 **130–160**
- 核心页平均 **1,500–3,000 词**
- Experience 只保留 **40–50** 个高质量独立页
- 4 个 Pillar、12 个 Cluster、30 个独立 Q&A
- 核心医疗页 100% 有 Sources + 审阅日期
- 重复 title / 重复药物页 / 断链归零

原则：**先减噪，再加页；不继续生产 45 词的 Experience 页。**

## 2. 硬性约束

1. 这是 YMYL 健康内容站。不得写人体剂量、注射、疗效、治愈、保证戒烟等声明。
2. 不虚构医生、审阅者、临床认证、研究数据或统计。
3. 找不到合格临床审阅者时，明确写“本页未由临床医生审阅”，不得写 medically reviewed。
4. 所有医疗结论必须能回到公开指南/系统综述/研究记录；优先使用：
   - WHO 2024 戒烟指南
   - USPSTF 2021
   - NICE NG209
   - Cochrane reviews
   - FDA / CDC / NHS / NIH 官方页面
   - 数据站 R-001…R-017
5. Tavily 当前不可用；需要联网核验时用 `web_fetch` 抓官方页面，不得凭记忆编 URL。
6. 不修改其他项目；只改 `SmokingCessation` 和必要的数据站链接。
7. 每晚只执行一个任务单元；07:30 前必须停止并提交/报告。
8. 每次提交前必须：
   - `npm run build`
   - 检查构建页数
   - 检查新增/修改页面的 title/description/canonical/H1
   - 检查内链无 404
   - `git status` 干净后 commit + push

## 3. 夜间任务表

### Phase 0 — 减噪与修复

| 任务 | 内容 | 验收 |
|---|---|---|
| N1 | 合并 6 组 methods/medications 重复 | `/medications/{slug}/` 为唯一主页面；`/methods/{slug}/` 301；sitemap 无重复标题；构建通过 |
| N2 | Experience 质量门 | 只生成 qualityScore ≥7 且关键字段完整的记录；indexable Experience ≤60；hub 计数更新；无断链 |
| N3 | Questions 拆分（前 10 题） | `/questions/{slug}/` 10 页；每页 5–8 FAQ；hub 链接；移除 112 问 FAQPage |
| N4 | Metadata + schema + 审阅声明 | title ≤60；description 140–155；重复标题 0；Article 有 author/datePublished；新增 Editorial/Medical Review Policy |

### Phase 1 — 4 个 Pillar

| 任务 | 页面 | 目标词数 |
|---|---|---:|
| N5 | How to Quit Smoking: Complete Evidence-Based Guide | 4,000–5,000 |
| N6 | Nicotine Withdrawal Timeline: Hour by Hour, Week by Week | 3,500–4,500 |
| N7 | Quit Smoking Medications & NRT: Complete Comparison | 4,000–5,000 |
| N8 | Cravings, Triggers & Relapse Prevention | 3,500–4,500 |

每个 Pillar 必须：8–12 个 H2、2–4 个表格、8–12 个来源、12+ 内链、Article/MedicalWebPage schema、Last reviewed、相关 Cluster 链接。

### Phase 2 — 12 个 Cluster（2 篇/夜）

| 任务 | Cluster |
|---|---|
| N9 | Cold Turkey vs Gradual Reduction；Nicotine Patch vs Gum vs Lozenge |
| N10 | Varenicline vs Cytisine vs Bupropion；Combination NRT vs Single Form |
| N11 | NRT vs Varenicline；E-Cigarettes for Smoking Cessation |
| N12 | How to Choose a Quit Method；First 72 Hours Without Smoking |
| N13 | First Week / First Month；Weight Gain After Quitting |
| N14 | Mental Health and Quitting；Pregnancy and Smoking Cessation |

每篇 1,800–2,500 词、6–10 来源、8–12 内链、比较表/行动表。

### Phase 3 — 30 个独立 Q&A（5 篇/夜）

| 任务 | 范围 |
|---|---|
| N15–N20 | 从 `/questions/` 中拆 30 个高意图问题；每篇 1,200–1,800 词、4–8 来源、5–8 FAQ |

优先问题：
- 戒烟后多久不难受 / withdrawal 持续多久
- 第一周最难的是哪几天
- cold turkey vs gradual
- nicotine patch vs gum
- varenicline vs bupropion
- combination NRT 是否更好
- 戒烟后咳嗽 / 头痛 / 失眠 / 便秘 / 焦虑 / 体重
- 饭后 / 咖啡 / 酒精 / 压力触发
- 复吸一支是否等于失败
- 电子烟是否能帮助戒烟
- 孕期/哺乳期 NRT
- 心理健康与戒烟
- 老年人/长期吸烟者
- 如何跟医生谈戒烟药

### Phase 4 — 人群页与长尾（5 篇/夜）

| 任务 | 范围 |
|---|---|
| N21–N24 | 老年人、COPD、心血管、糖尿病、ADHD、轮班工作者、照护者、双使用、酒精场景等 |

### Phase 5 — 证据与工具

| 任务 | 内容 |
|---|---|
| N25+ | `/evidence/` 索引；R-001…R-017 回链；每核心页 Evidence behind this page |
| 后续 | Quit Plan Builder、Withdrawal Symptom Checker、Craving SOS |
| 每季度 | WHO / USPSTF / NICE 指南复核 |

## 4. 每晚执行流程

1. 读 `docs/nightly-progress.md`，取 `Next` 任务。
2. 只执行该任务；先读相关源文件和已有页面。
3. 研究/写作时先查数据站 R 记录和官方指南；不编造。
4. 修改后运行 `npm run build`。
5. 检查：
   - 页数
   - 新增页 title/description/canonical/H1
   - 内链 0 404
   - 重复 title
6. `git add` 只加本任务文件；commit；push。
7. 更新 `docs/nightly-progress.md`：
   - 完成任务 ID
   - 日期
   - commit
   - 构建页数
   - 下一任务
8. 输出 5 行报告；07:30 前停止。

## 5. 阻塞处理

- 如果临床审阅者信息缺失：不要阻塞整条任务；在页面明确写“未由临床医生审阅”，继续完成可核实内容。
- 如果官方来源无法访问：使用数据站已核验记录；仍无法核实时，标记 `NEEDS_VERIFICATION`，不要编造。
- 如果任务超出当晚窗口：完成可交付子集，更新 progress 为 `partial`，下一晚继续；不要半成品 push。
- 如果构建失败：修复或回滚，不提交破站。

## 6. 报告格式

```
N{id} {task}
- 文件：
- 词数/页面：
- 来源：
- 构建：
- 断链：
- commit：
- 下一任务：
```
