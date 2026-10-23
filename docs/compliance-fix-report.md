# Compliance Fix Report — smokingcessationhub.com

> 日期：2026-10-23 ｜ 仓库：`SmokingCessation`（main）｜ 范围：六页基线合规全检 + 修复批
> 六页基线：about / contact / privacy / terms / cookies / disclaimer

## 1. 检查矩阵（词数前 → 后）

| 页面 | 修复前 | 修复后 | 变化 |
|---|---|---|---|
| about | 524 | 722 | +补主体披露 + 法律治理互链 |
| disclaimer | 337 | 636 | +疗效禁止声明 + 紧急就医 + schema |
| privacy | 301 | 857 | 数据收集逐项增厚 + schema |
| contact | —（缺） | 756 | 新建 |
| terms | —（缺） | 1499 | 新建（17 条款） |
| cookies | —（缺） | 1255 | 新建（12 节） |

（词数为 `wc -w` 原文含标记；正文纯文本略低。）

## 2. 医疗合规口径核验

- **追踪实况**：`config.yaml` `googleAnalytics.id = null`，Partytown `hasExternalScripts = false` → 无 GA、无第三方脚本、无广告/追踪 cookie。隐私与 cookie 页按此如实陈述，未虚构。
- **疗效/替代医疗宣称**：全六页扫描无违规。唯一命中为 disclaimer 自身否定句（"makes no claims that any method or product cures, treats or guarantees quitting smoking"）——正确负面口径。
- **禁止措辞**（cures / guaranteed to work / safe for everyone / no side effects / recommended dose）→ 未命中。
- **医疗免责分层**：disclaimer 保持并强化——not medical advice / not a substitute for healthcare professional / medication 不推荐剂量、不判断适用性 / 紧急情况请就医（含戒烟期胸痛、气短、晕厥等安全提示）。
- **contact「不做什么」**：明确不提供医疗咨询、戒烟临床诊疗、剂量建议、紧急响应。
- **terms §4 / §5**：医疗免责交叉引用 + 无医患关系声明。
- **schema 不回归**：contact 用 `ContactPage`；其余五页 `WebPage` + `BreadcrumbList`；布局层 `WebSite`/`Organization` 不变。

## 3. 新建页清单

| 文件 | URL | 要点 |
|---|---|---|
| `src/pages/contact.astro` | `/contact/` | 纠错/合作通道、不提供医疗服务、响应预期可兑现、紧急声明 |
| `src/pages/terms.astro` | `/terms/` | 准入、内容性质、IP/许可、用户行为、医疗免责、责任限制、管辖、可分割性 |
| `src/pages/cookies.astro` | `/cookies/` | 无 cookie 实况、localStorage 主题偏好、consent、与 privacy 互链 |

## 4. 主体披露现状与待确认

**现状（站点现有信息为准，未编造）：**

- 站点名 / Organization schema：`Quit Smoking Hub`（`sameAs: []`）
- 内容署名 / reviewedBy schema：`SmokingCessationHub Tech Team`（团队署名，非虚构个人医生）
- **无** 法律主体名称、注册地址、公开运营邮箱 / 电话 / 联系表单。

**待确认清单（留待运营方提供后补登）：**

1. 运营主体法定名称与注册地（terms §15 管辖法据此补全）
2. 公开联系邮箱（contact「How to reach us」占位如实说明，暂未公布）
3. 是否启用 analytics（若启用需同步修订 privacy/cookies 并加 consent）
4. Organization schema 的 `sameAs` 社交/权威资料（当前为空）

## 5. 构建与提交

- `npm run build` → **通过**（exit 0，219 页；`dist/` 含六页，sitemap 收录全部六页）
- 逐页 commit（`compliance-fix-*`）：
  - `compliance-fix-contact` / `compliance-fix-terms` / `compliance-fix-cookies`
  - `compliance-fix-privacy` / `compliance-fix-about` / `compliance-fix-disclaimer`
  - `compliance-fix-nav`（页脚六页互链）
