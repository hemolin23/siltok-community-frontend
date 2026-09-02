DELETE FROM community_posts WHERE id LIKE 'cpost_%';
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_7696f7a84efe3ae3', 'douyin', '7671102265968626978', 'https://www.douyin.com/video/7671102265968626978', '第九序架构', '仅6G显存本地部署！开源全能视频大模型 Minimax‑H3 新一代开源旗舰视频模型 Minimax H3，强悍的多模态', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '电商广告', '部署教程', 'MiniMax H3 / ComfyUI', 94.49, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_421b40cd25ad3eba', 'bilibili', 'BV1nftmzxEqN', 'https://www.bilibili.com/video/BV1nftmzxEqN/', '不止设计工作室', 'Wan2.2 AI视频详细教程 模型 插件 环境 报错 一次解决！本地部署+云端使用任你选择！', '围绕 Wan2.2 的部署与运行故障，整理可复现的检查顺序，适合作为 AI 视频生产 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', 'AI 视频生产', '排错复盘', 'Wan2.2', 89.13, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_e9e5cca21b8579fa', 'douyin', '7673025924448024550', 'https://www.douyin.com/video/7673025924448024550', '希希说运营', 'Seedance2.0 Fast vs Minimax H3 最近高强度测了热度很高的 Minimax H3 和 See', '把 MiniMax H3 / Seedance 2 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
同时记录生成耗时、抽卡次数与可用片段数
批量任务必须记录失败重试、队列时间与单条可用成本', '电商广告', '模型实测', 'MiniMax H3 / Seedance 2', 87.62, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_b8fce8dd31b8ca65', 'douyin', '7673713539554577691', 'https://www.douyin.com/video/7673713539554577691', 'Rick（瑞奇说）', 'MiniMax H3开源后，AMD显卡真的比N卡香了？ 用 R9700 实测对比MiniMax H3和常用开源模型：Wa', '把 MiniMax H3 / Wan2.2 / HunyuanVideo 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
同时记录生成耗时、抽卡次数与可用片段数
区分模型能力差异与工作流配置差异', 'AI 视频生产', '模型实测', 'MiniMax H3 / Wan2.2 / HunyuanVideo', 83.78, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_6e0771b9ef0e68fa', 'bilibili', 'BV1mU8x68EL8', 'https://www.bilibili.com/video/BV1mU8x68EL8/', 'NiuGee', '显卡要冒烟了？实测本地部署MinMax-H3模型，这画质简直是短视频神器！🟢批量做短视频，本地最强模型MinMaxH3本', '把 MiniMax H3 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
同时记录生成耗时、抽卡次数与可用片段数
批量任务必须记录失败重试、队列时间与单条可用成本', '角色一致性', '模型实测', 'MiniMax H3', 82.49, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_dfb816ab54428580', 'douyin', '7666741033996193062', 'https://www.douyin.com/video/7666741033996193062', '小枫 AI｜ComfyUI', '从零部署Wan2.2文生视频！缺失节点模型排错全攻略 最近捣鼓ComfyUI 1.6纯净版部署，把从零装Wan2.2文生', '围绕 Wan2.2 / ComfyUI 的部署与运行故障，整理可复现的检查顺序，适合作为 AI 视频生产 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', 'AI 视频生产', '排错复盘', 'Wan2.2 / ComfyUI', 82.45, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_1f0dc75cb452bab0', 'douyin', '7674979679204986112', 'https://www.douyin.com/video/7674979679204986112', '小白debug', 'MiniMax-H3 AI漫剧云端自部署教程 MiniMax-H3 API太贵？云端自部署，让成本压到 1/8 #GPU', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
首跑采用小尺寸样例，先验证链路再提升规格
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'MiniMax H3 / ComfyUI', 82.28, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_86b35ee3ca2acf18', 'douyin', '7675657870397951267', 'https://www.douyin.com/video/7675657870397951267', 'AIGC秋叶', '本地部署长视频 8G/12显卡也能跑高画质！ 很多朋友本地跑 MiniMax‑H3，都被显存卡住，8G/12G 显卡很难', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'MiniMax H3 / ComfyUI', 80.26, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_f5bd07c124cef865', 'douyin', '7652194600681032979', 'https://www.douyin.com/video/7652194600681032979', 'AI情报局', '6GB显存，本地跑通AI短剧流程 一秒几块钱的 AI 短视频成本，最劝退人的往往不是最后一条成片，而是前面反复试镜头。 ', '以 FramePack 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'FramePack', 79.56, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_2d5d7cfe02394ac9', 'douyin', '7675285063965134080', 'https://www.douyin.com/video/7675285063965134080', '深大学识浅薄之人', '10万以内，真能在家“克隆”一个人？ 一张参考图 + 一段声音，就能在本地生成一个会替你说话的数字人。 完整流程其实就这', '围绕 AI 视频工具链 的部署与运行故障，整理可复现的检查顺序，适合作为 数字人 工作流上线前的排错清单。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', '数字人', '排错复盘', 'AI 视频工具链', 79.4, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_50884b87851ae153', 'douyin', '7669371155840519478', 'https://www.douyin.com/video/7669371155840519478', 'asdfghjklqwertyuiopz', 'Seedance 2.0 vs MiniMax H3 整体效果比我预想中更好。 就这次15秒场景穿越测试来看，Seeda', '把 MiniMax H3 / Seedance 2 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
区分模型能力差异与工作流配置差异', '低显存部署', '模型实测', 'MiniMax H3 / Seedance 2', 78.87, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_cdb39872fbbc0c3f', 'douyin', '7670830155065052454', 'https://www.douyin.com/video/7670830155065052454', 'AI云端货架', '三步解决ComfyUI必玩H3开源模型工作流配置问题 专为国内爱国的、网络不顺畅的小伙伴们，教你怎么去配置MiniMax', '拆解 AI 视频生产 中可复用的 MiniMax H3 / ComfyUI 生产流程，重点观察输入资产、节点编排和批量交付之间的关系。', '从业务交付物倒推输入资产与模型选择
把高频人工判断沉淀为 Skill 或参数模板
用可用率和返工原因评价工作流，而非只看最好样片', 'AI 视频生产', '工作流拆解', 'MiniMax H3 / ComfyUI', 78.8, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_4f9feb80ce20a4c4', 'douyin', '7676050122660236579', 'https://www.douyin.com/video/7676050122660236579', 'ComfyUi秋叶启动器', '本地部署8/12G显卡玩转AI长视频生成工作流来了 很多朋友本地跑 MiniMax‑H3都被显存卡住，8G/12G 显卡', '以 ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'ComfyUI', 78.04, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_59487eb20f85f9e2', 'bilibili', 'BV1HPuy6QEy2', 'https://www.bilibili.com/video/BV1HPuy6QEy2/', '李心宝爱玩Ai', 'MiniMaxH3全套工作流，7倍提速8G显存确实可用，最新版纯净整合包，无限制优化提示词，7倍加速模型及lora，海螺', '以 MiniMax H3 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
批量任务必须记录失败重试、队列时间与单条可用成本', '角色一致性', '部署教程', 'MiniMax H3', 77.05, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_20d0d8b72f930ed5', 'xiaohongshu', '6a71849d0000000035017145', 'https://www.xiaohongshu.com/explore/6a71849d0000000035017145', '西里森森', 'MiniMax H3正式上线，实测水平到底如何？', '把 MiniMax H3 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
同时记录生成耗时、抽卡次数与可用片段数
区分模型能力差异与工作流配置差异', '电商广告', '模型实测', 'MiniMax H3', 76.6, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_f5c8733a4c2a5f1c', 'bilibili', 'BV1uQ4y1V7bP', 'https://www.bilibili.com/video/BV1uQ4y1V7bP/', '设计师学Ai', '【详细攻略】在Comfyui上搭建图片转视频SVD工作流，Stable Video Diffusion的动画参数调节和报', '围绕 ComfyUI 的部署与运行故障，整理可复现的检查顺序，适合作为 AI 视频生产 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', 'AI 视频生产', '排错复盘', 'ComfyUI', 76.52, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_5d969bce5586e074', 'douyin', '7674553542484430126', 'https://www.douyin.com/video/7674553542484430126', 'ComfyUi秋叶启动器', 'MiniMax-h3终极版教程来了，低显存也能做出AI大片 #minimax #comfyui #AI短剧 #AI视频 ', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'MiniMax H3 / ComfyUI', 76.16, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_148a0503e08871ec', 'douyin', '7677155578518523151', 'https://www.douyin.com/video/7677155578518523151', 'AIGC秋叶', '本地部署生成长视频电影质感全流程！ 本地部署长视频 8G/12显卡也能跑高画质！很多朋友本地跑 MiniMax‑H3，都', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'MiniMax H3 / ComfyUI', 76.16, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_1ff4c7723664555f', 'bilibili', 'BV18qtp6WEdi', 'https://www.bilibili.com/video/BV18qtp6WEdi/', 'YZ_金鱼', 'MiniMax H3 轻松解决画面油腻、模糊、高动态、一致性问题', '拆解 角色一致性 中可复用的 MiniMax H3 生产流程，重点观察输入资产、节点编排和批量交付之间的关系。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
把高频人工判断沉淀为 Skill 或参数模板
用可用率和返工原因评价工作流，而非只看最好样片', '角色一致性', '工作流拆解', 'MiniMax H3', 75.82, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_f2df5e25144cbf68', 'bilibili', 'BV16yoeBzEwA', 'https://www.bilibili.com/video/BV16yoeBzEwA/', 'AIEveryThing', '参考一切！LTX2.3+wan2.2全能参考教程，类似即梦seedance2.0', '以 Wan2.2 / LTX-2.3 / Seedance 2 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
首跑采用小尺寸样例，先验证链路再提升规格
记录显存、耗时和异常节点，形成设备适配档案', '剧情短片', '部署教程', 'Wan2.2 / LTX-2.3 / Seedance 2 / ComfyUI', 75.51, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_7348bd1df9d3e53e', 'bilibili', 'BV1M58F6ZEU4', 'https://www.bilibili.com/video/BV1M58F6ZEU4/', '船长的角落', 'MiniMax H3+Agent全自动生产完整教程｜一套可复刻的AI短片流水线', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
批量任务必须记录失败重试、队列时间与单条可用成本', '剧情短片', '部署教程', 'MiniMax H3 / ComfyUI', 75.34, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_b187839863e1a04a', 'douyin', '7674168141374704948', 'https://www.douyin.com/video/7674168141374704948', '大象学长', 'MiniMax H3免费本地部署？零基础小白保姆级教程 从安装ComfyUI到成功出片，用Codex解决提示词、加速和报', '围绕 MiniMax H3 / ComfyUI 的部署与运行故障，整理可复现的检查顺序，适合作为 AI 视频生产 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', 'AI 视频生产', '排错复盘', 'MiniMax H3 / ComfyUI', 75.22, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_1a84ddeccabbe2b2', 'bilibili', 'BV1GbvsBVEve', 'https://www.bilibili.com/video/BV1GbvsBVEve/', 'Swan鹄仙', 'WanGP本地部署 在低显存低内存的设备上运行Wan2.2 免连线烦恼 支持N卡10系 20系 30系 40系 50系 ', '围绕 Wan2.2 的部署与运行故障，整理可复现的检查顺序，适合作为 低显存部署 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
每次只改一个变量，保留可回退版本', '低显存部署', '排错复盘', 'Wan2.2', 74.66, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_a5178c266eddaff3', 'bilibili', 'BV1SXtb6qEtK', 'https://www.bilibili.com/video/BV1SXtb6qEtK/', '南极来の企鹅', 'MiniMax H3分段视频工作流V7.2保姆级教程｜附资源分享、AI漫剧经验分享、分镜设置、报错解决', '围绕 MiniMax H3 的部署与运行故障，整理可复现的检查顺序，适合作为 剧情短片 工作流上线前的排错清单。', '先固定模型、节点版本和输入参数，再讨论效果
把报错日志、显存峰值和失败样片放在同一条记录中
批量任务必须记录失败重试、队列时间与单条可用成本', '剧情短片', '排错复盘', 'MiniMax H3', 74.48, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_a2150d93422140df', 'bilibili', 'BV1gbtEzWET6', 'https://www.bilibili.com/video/BV1gbtEzWET6/', '智码社', '【保姆级教程】有手就行！一分钟本地部署阿里通义万相2.2，wan2.2本地部署全流程，小白也能学会！', '以 Wan2.2 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
首跑采用小尺寸样例，先验证链路再提升规格
记录显存、耗时和异常节点，形成设备适配档案', 'AI 视频生产', '部署教程', 'Wan2.2 / ComfyUI', 74.45, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_3a2786b594d2fc25', 'douyin', '7662655368127941897', 'https://www.douyin.com/video/7662655368127941897', '小枫 AI｜ComfyUI', '自学 Comfy 第 6 天｜Wan2.2量化文生视频工作流 Comfy 自学打卡第六天，分享适配 16G 及以内显存的', '以 Wan2.2 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '角色一致性', '部署教程', 'Wan2.2 / ComfyUI', 74.2, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_8c08e8a970802451', 'bilibili', 'BV16g8J6AEZD', 'https://www.bilibili.com/video/BV16g8J6AEZD/', '孤海FOTO', 'H3智能一体化节点重磅升级，支持Qwen3.8本地免费提示词优化 在线API，解决开头破音问题', '拆解 AI 视频生产 中可复用的 MiniMax H3 生产流程，重点观察输入资产、节点编排和批量交付之间的关系。', '从业务交付物倒推输入资产与模型选择
把高频人工判断沉淀为 Skill 或参数模板
批量任务必须记录失败重试、队列时间与单条可用成本', 'AI 视频生产', '工作流拆解', 'MiniMax H3', 74.09, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_ce8d5c861d4a391c', 'bilibili', 'BV1RgM36CEAF', 'https://www.bilibili.com/video/BV1RgM36CEAF/', '大凯智障君', '【电商广告利器】Krea 2+LTX 2.3：深度图 + 广告风格控制，15 秒商业视频一键批量生成！', '以 LTX-2.3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
首跑采用小尺寸样例，先验证链路再提升规格
批量任务必须记录失败重试、队列时间与单条可用成本', '电商广告', '部署教程', 'LTX-2.3 / ComfyUI', 73.73, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_8a50787ac2cffbf7', 'bilibili', 'BV1mybYzhEpc', 'https://www.bilibili.com/video/BV1mybYzhEpc/', '啦啦啦的小黄瓜', '[ComfyUI]wan2.2性能优化方案详解，纯干货教程！让小显存发挥大性能！', '以 Wan2.2 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
首跑采用小尺寸样例，先验证链路再提升规格
记录显存、耗时和异常节点，形成设备适配档案', 'AI 视频生产', '部署教程', 'Wan2.2 / ComfyUI', 73.59, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_e4fa12eb291cc9e2', 'bilibili', 'BV1aAuR6wEt2', 'https://www.bilibili.com/video/BV1aAuR6wEt2/', 'T8star-Aix', '去画质油腻！MiniMax H3实操人像Lora训练教程，新手零基础全流程，高一致性，音频训练，双数据集，云端镜像及踩坑', '围绕 MiniMax H3 / ComfyUI 的部署与运行故障，整理可复现的检查顺序，适合作为 角色一致性 工作流上线前的排错清单。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
把报错日志、显存峰值和失败样片放在同一条记录中
每次只改一个变量，保留可回退版本', '角色一致性', '排错复盘', 'MiniMax H3 / ComfyUI', 73.48, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_65ef07e90a755d17', 'xiaohongshu', '6a76c8eb00000000320301aa', 'https://www.xiaohongshu.com/explore/6a76c8eb00000000320301aa', '零度解说', 'MiniMax H3 生成速度飙升！低显存也能跑！', '以 MiniMax H3 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '角色卡、参考帧、景别和服装约束需要作为固定输入资产
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '角色一致性', '部署教程', 'MiniMax H3', 73.42, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_97fec8f402c75c13', 'douyin', '7672874897114361050', 'https://www.douyin.com/video/7672874897114361050', '雄赳赳气不打一处来买瓜吗', '8G显存4060+16G内存用minimax_h3生成20秒的480P内容只要11分钟，，感谢开源社区。工作流在主页群里', '以 MiniMax H3 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '低显存部署', '部署教程', 'MiniMax H3', 73.15, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_4fdbfca35bf1aecf', 'bilibili', 'BV1PDuj61EhS', 'https://www.bilibili.com/video/BV1PDuj61EhS/', 'TimeTraveler_0', '6G显存也能跑MiniMax H3？RTX 3060本地生成实测｜ComfyUI官方工作流+加速部署教程｜Sage At', '把 MiniMax H3 / ComfyUI 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
区分模型能力差异与工作流配置差异', '低显存部署', '模型实测', 'MiniMax H3 / ComfyUI', 72.72, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_91b9d4cda1b3b8e2', 'bilibili', 'BV1fKmHByEBj', 'https://www.bilibili.com/video/BV1fKmHByEBj/', '像素幻想Lab', '【ComfyUI】Wan2.2自动提示词视频生成工作流合集 | 超低占用，8G显存可玩，极致速度，质量稳定', '拆解 低显存部署 中可复用的 Wan2.2 / ComfyUI 生产流程，重点观察输入资产、节点编排和批量交付之间的关系。', '从业务交付物倒推输入资产与模型选择
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
批量任务必须记录失败重试、队列时间与单条可用成本', '低显存部署', '工作流拆解', 'Wan2.2 / ComfyUI', 72.48, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_78f0312bf7b468f3', 'douyin', '7675438725568023854', 'https://www.douyin.com/video/7675438725568023854', '辉.', '4060 8G显存跑comfy ui 本地部署mini max H3，两分钟左右的视频，跑了四个小时，一镜生成，无修改 ', '以 MiniMax H3 / ComfyUI 为主线拆解从环境准备到首条可用结果的路径，可转化为 Siltok 的开箱引导与一键安装检查项。', '把下载、依赖、模型位置和节点版本做成前置检查
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
记录显存、耗时和异常节点，形成设备适配档案', '低显存部署', '部署教程', 'MiniMax H3 / ComfyUI', 71.81, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
--> statement-breakpoint
INSERT OR IGNORE INTO community_posts (id, source_platform, source_post_id, source_url, source_creator_name, original_title, summary, key_lessons, scenario, content_type, model_names, source_score, status, visibility, collected_at, created_at, updated_at) VALUES ('cpost_6535a1b021ec64ff', 'douyin', '7674620663688072484', 'https://www.douyin.com/video/7674620663688072484', '熊猫怪兽AI日记', '16G 显存跑通MiniMax H3 满血版直出15 秒视频 机器配置：32GB 内存＋16GB 显存。实测运行约 11', '把 MiniMax H3 / ComfyUI 放进同一类任务中比较，重点关注成片速度、可用率与部署成本，而不是只看单条演示效果。', '比较前统一分辨率、时长、步数和参考素材
低显存场景优先验证量化、卸载、分辨率和时长的组合边界
区分模型能力差异与工作流配置差异', '低显存部署', '模型实测', 'MiniMax H3 / ComfyUI', 71.31, 'published', 'public', 1788326400000, 1788326400000, 1788326400000);
