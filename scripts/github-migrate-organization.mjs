#!/usr/bin/env node
import {readFile,access} from "node:fs/promises";
import {spawnSync} from "node:child_process";
const apply=process.argv.includes("--apply");
const configPath=process.env.GITHUB_MIGRATION_CONFIG??".github/github-migration.json";
try{await access(configPath)}catch{console.error(`Copy .github/github-migration.example.json to ${configPath} and review it first.`);process.exit(1)}
const cfg=JSON.parse(await readFile(configPath,"utf8"));
const token=process.env.GH_TOKEN||process.env.GITHUB_TOKEN;
if(apply&&!token){console.error("GH_TOKEN with target-organization owner/admin permissions is required for --apply.");process.exit(1)}
function redact(args){return args.map(x=>x.includes("secret")?x:x).join(" ")}
function gh(args,input){console.log(`gh ${redact(args)}`);if(!apply)return;const result=spawnSync("gh",args,{encoding:"utf8",input,env:{...process.env,GH_TOKEN:token}});if(result.status!==0){console.error(result.stderr||result.stdout);process.exit(result.status??1)}if(result.stdout)console.log(result.stdout.trim())}
const source=cfg.sourceOrganization,target=cfg.targetOrganization;
console.log(`${apply?"Applying":"Planning"} GitHub migration ${source} -> ${target}`);
for(const repo of cfg.repositories){
 const full=`${target}/${repo}`;
 // Repository canonical metadata and variables
 for(const [name,value] of Object.entries(cfg.variables??{}))gh(["variable","set",name,"--repo",full,"--body",String(value)]);
 // Secrets cannot be copied/read from GitHub; values must be supplied as environment variables.
 for(const name of cfg.repositorySecrets??[]){const value=process.env[name];if(!value){console.warn(`SKIP repository secret ${name}: environment value not supplied`);continue}gh(["secret","set",name,"--repo",full],value)}
 // Team access
 for(const [team,permission] of Object.entries(cfg.teams??{}))gh(["api","--method","PUT",`orgs/${target}/teams/${team}/repos/${target}/${repo}`,"-f",`permission=${permission}`]);
 // Branch protection. Existing protection is replaced only for configured branch/checks.
 const checks=(cfg.requiredStatusChecks??[]).map(context=>({context}));
 const protection={required_status_checks:{strict:true,checks},enforce_admins:true,required_pull_request_reviews:{dismiss_stale_reviews:true,require_code_owner_reviews:true,required_approving_review_count:1},restrictions:null,required_linear_history:true,allow_force_pushes:false,allow_deletions:false,block_creations:false,required_conversation_resolution:true,lock_branch:false,allow_fork_syncing:true};
 gh(["api","--method","PUT",`repos/${full}/branches/${cfg.defaultBranch}/protection`,"--input","-"],JSON.stringify(protection));
 // Repository webhooks: create from explicit configuration; secrets come from env webhook.secretEnv.
 for(const hook of cfg.webhooks??[]){const secret=hook.secretEnv?process.env[hook.secretEnv]:undefined;if(hook.secretEnv&&!secret){console.warn(`SKIP webhook ${hook.url}: ${hook.secretEnv} missing`);continue}const payload={name:"web",active:hook.active!==false,events:hook.events??["push","pull_request"],config:{url:hook.url,content_type:"json",insecure_ssl:"0",...(secret?{secret}:{})}};gh(["api","--method","POST",`repos/${full}/hooks`,"--input","-"],JSON.stringify(payload))}
}
// Organization-level secrets: values are never retrievable, so inject through environment.
for(const name of cfg.organizationSecrets??[]){const value=process.env[name];if(!value){console.warn(`SKIP organization secret ${name}: environment value not supplied`);continue}gh(["secret","set",name,"--org",target,"--visibility","selected","--repos",cfg.repositories.join(",")],value)}
console.log("GitHub App installations cannot be transferred by API. Install each configured app in the target organization, grant repository access, rotate its private key/webhook secret, and revoke the source installation after validation.");
console.log(apply?"Migration API operations completed. Validate Actions, deployments, webhooks, app installations, rulesets, and audit logs before revoking source access.":"Plan complete. Re-run with --apply after reviewing config and supplying secrets through environment variables.");
