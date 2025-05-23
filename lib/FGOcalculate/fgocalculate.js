/*
페그오 계산식 라이브러리
즉사율 : InstantKillRateCalc(적 즉사보정, 즉사 배율, 즉사 확률 버프, 즉사 내성 적 버프, 즉사 내성 적 디버프)
보구 대미지 : NpDamageCalc(최종 공격력, 클래스 (string), 클래스 상성 값 (0.5, 1, 1.5, 2), 보구 커멘드, 보구 배율,
        공격력 버프, 보구 커멘드 버프, 보구 위력&특공버프, 특공보구 특공 배율, 체력반비례 보구 배율 (보구배율 * (1-현재체력/총체력)), 난수, 히든상성)
평타 대미지 : DamageCalc (최종 공격력, 클래스, 클래스 상성 값, 커멘드, 커멘드 순서, 버스터 첫수 여부 (true, false), 버스터 체인 여부 (t/f),
        공격력 버프, 커멘드 버프, 특공버프, 크리티컬 버프, 대미지 플러스, 난수, 히든상성, 크리티컬 여부 (t/f))
        extra의 경우 3커멘 동일시 커멘드 순서 2, 아닐시 1을 입력
NP 획득 : CmdNpGainCalc (첫수 아츠 여부 (t/f), 커멘드, 커멘드 순서, 기본 NP 수급량, 커멘드 버프, 수급량 버프, 제오세 여부(t/f) 적 수급계수, 타수,
        크리티컬 여부(t/f), 오버킬 여부 (t/f))
스타 획득 (타수당)

 */

(function (window) {

    function FGOcalLib() {
        var _FGOcalLib = {};

        //수치 데이터 선언 (const)

        const CmdIndex = {
            "arts": 0,
            "buster": 1,
            "quick": 2,
            "extra": 3,
        };

        const CmdNpGainMul = [
            [3, 4.5, 6],//arts
            [0, 0, 0],//buster
            [1, 1.5, 2],//quick
            [1]//extra
        ];//커멘드 NP 보정계수

        const CmdDmgMul = [
            [1, 1.2, 1.4],//arts
            [1.5, 1.8, 2.1],//buster
            [0.8, 0.96, 1.12],//quick
            [1, 1]//extra default, allsamecard (다똑같으면 1, 아니면 2로 order index 입력)
        ];

        const CmdStarMul = [
            [0, 0, 0],
            [0.1, 0.15, 0.2],
            [0.8, 1.3, 1.8],
            [1, 1]
        ];

        const ExtraBonus = [2, 3.5];

        const ClassIndex =
            {
                "saber": 0,
                "archer": 1,
                "lancer": 2,
                "rider": 3,
                "caster": 4,
                "assassin": 5,
                "berserker": 6,
                "shielder": 7,
                "ruler": 8,
                "avenger": 9,
                "mooncancer": 10,
                "alterego": 11,
                "foreigner": 12,
                "pretender": 13,
                "draco": 14,
                "eresh" : 15
            };//클래스 텍스트 인덱스 테이블

        const ClassKorList = ["세이버", "아처", "랜서", "라이더", "캐스터", "어새신", "버서커", "실더", "룰러",
            "어벤저", "문캔서", "얼터에고", "포리너", "프리텐더", "비스트(드라코)", "비스트(에레)"];

        const ClassDmgMagTable = [1, 0.95, 1.05, 1, 0.9, 0.9, 1.1, 1, 1.1, 1.1, 1, 1, 1, 1, 1, 1];//클래스 보정계수

        const ClassDefMag =
            [
                [1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//saber
                [2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//archer
                [0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//lancer
                [1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//rider
                [1.0, 1.0, 1.0, 0.5, 1.0, 2.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//caster
                [1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],//assassin
                [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.0, 1.5, 1.5, 1.5, 1.5, 0.5, 1.5, 0.5, 1.0],//berserker
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],//shielder
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5],//ruler
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 2.0],//avenger
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5],//mooncancer
                [0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 2.0, 0.5],//alterego
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 2.0, 2.0, 0.5],//foreigner
                [1.5, 1.5, 1.5, 0.5, 0.5, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 2.0, 0.5],//pretender
                [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.0, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0, 1.0],//draco
                [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.5, 0.5, 1.5, 1.5, 1.5, 1.5, 1.0, 1.0],//eresh

            ];

        const HiddenIndex =
            {
                "천": 0,
                "지": 1,
                "인": 2,
                "성": 3,
                "수": 4
            };
        const HiddenIndexKor = ["천", "지", "인", "성", "수"];

        const HiddenClassDefMag =
            [
                [1, 1.1, 0.9, 1, 1],//천
                [0.9, 1, 1.1, 1, 1],//지
                [1.1, 0.9, 1, 1, 1],//인
                [1, 1, 1, 1, 1.1],//성
                [1, 1, 1, 1.1, 1]//수
            ];

        const RareMaxLev = [65, 60, 65, 70, 80, 90];
        const CraftMaxLev = [0, 50, 55, 60, 80, 100];

        // 클래스 2배상성 관련 필터용
        const generalClassNotBurseker = ["saber", "archer", "lancer", "rider", "caster", "assassin"];
        const extraClassNotBeast = ["ruler", "avenger", "mooncancer", "alterego", "foreigner", "pretender"];



        _FGOcalLib.myCustomLog = function (thingtoLog) {
            console.log("My-Custom-Log > Type of variable : " + typeof (thingtoLog));
            console.log("My-Custom-Log > Is number : " + !isNaN(thingtoLog));
            console.log("My-Custom-Log > Length : " + (thingtoLog).length);
            console.log("FGO Calculation Library Loaded");

            return console.log(thingtoLog);
        };

        _FGOcalLib.getClassDmgMag = function (Class) {
            return ClassDmgMagTable[ClassIndex[Class]];
        }

        _FGOcalLib.InstantKillRateCalc = function (EnemyDeathRate, InstantKillMul, InstantKillBuf, InstantKillEnemyResBuf, InstantKillEnemyDebuf) {
            if (InstantKillEnemyResBuf > 5)
                InstantKillEnemyResBuf = 5;
            if (InstantKillEnemyDebuf > 5)
                InstantKillEnemyDebuf = 5;
            if (InstantKillBuf > 5)
                InstantKillBuf = 5;
            return EnemyDeathRate * InstantKillMul * (100 + InstantKillBuf - InstantKillEnemyResBuf + InstantKillEnemyDebuf) / 100;
        }

        _FGOcalLib.NpDamageCalc = function (AtkStat, Class, ClassMagMul, NpCmd, NpMag, AtkBuf, CmdBuf, NpDmgBuf, NpExtraMul, DmgPlus, HpProNpDmgMul,
                                            RanNum, HiddenDefMagMul) {
            var tmp = AtkStat * 0.23 * CmdDmgMul[CmdIndex[NpCmd]][0] * ClassDmgMagTable[ClassIndex[Class]] * ClassMagMul;

            if (AtkBuf < -100)
                AtkBuf = -100;
            else if (AtkBuf > 400)
                AtkBuf = 400;
            if (CmdBuf < -100)
                CmdBuf = -100;
            else if (CmdBuf > 400)
                CmdBuf = 400;

            if (NpDmgBuf < -100)
                NpDmgBuf = -100;
            tmp *= (100 + AtkBuf) / 100 * (100 + CmdBuf) / 100 * (100 + NpDmgBuf) / 100;
            if (NpExtraMul > 0)
                tmp *= NpExtraMul / 100;
            tmp *= RanNum * HiddenDefMagMul;
            return Math.floor(Math.round(tmp * (NpMag + HpProNpDmgMul) * 100) / 10000 + DmgPlus);
        };

        _FGOcalLib.DamageCalc = function (AtkStat, Class, ClassMagMul, Cmd, CmdOrder, IsFirstBuster, IsBusterChain, AtkBuf, CmdBuf, ExtraDmgBuf,
                                          CritBuf, DmgPlus, RanNum, HiddenDefMagMul, IsCrit) {
            if (IsFirstBuster)
                IsFirstBuster = 0.5;
            else
                IsFirstBuster = 0;
            if (IsBusterChain)
                IsBusterChain = 0.2;
            else
                IsBusterChain = 0;


            if (AtkBuf < -100)
                AtkBuf = -100;
            else if (AtkBuf > 400)
                AtkBuf = 400;
            if (CmdBuf < -100)
                CmdBuf = -100;
            else if (CmdBuf > 400)
                CmdBuf = 400;

            var tmp = AtkStat * 0.23 * (CmdDmgMul[CmdIndex[Cmd]][CmdOrder - 1] * (100 + CmdBuf) / 100 + IsFirstBuster) *
                ClassDmgMagTable[ClassIndex[Class]] * ClassMagMul * RanNum * (100 + AtkBuf) / 100 * HiddenDefMagMul;

            if (IsCrit)
                tmp *= 2;
            else
                CritBuf = 0;
            if (Cmd == "extra")
                tmp *= ExtraBonus[CmdOrder - 1];

            tmp = tmp * ((100 + ExtraDmgBuf + CritBuf)) / 100 + Number(DmgPlus) + Number(AtkStat) * IsBusterChain;


            return Math.floor(Math.round(tmp * 100) / 100);


        }

        _FGOcalLib.CmdNpGainCalc = function (IsFirstCmdArts, Cmd, CmdOrder, Na, CmdBuf, NpGainBuf, IsFifthform, EnemyMul, Hits, IsCrit, IsOverKill) {
            var temp = Na * (CmdNpGainMul[CmdIndex[Cmd]][CmdOrder - 1] * (100 + CmdBuf) / 100 + IsFirstCmdArts) * EnemyMul * (100 + NpGainBuf) / 100;
            if (IsCrit)
                temp *= 2;
            temp = Math.floor(Math.round(temp * 10000) / 100);//소수점 오류 (가끔 -0.0001됨) 방지위해 낮은 자리수 반올림 후 내림
            if (IsOverKill)
                temp *= 1.5;
            if (IsFifthform)//제오세
                temp *= 2;
            return Math.floor(temp * Hits) / 100;
        }

        _FGOcalLib.CmdStarGainCalc = function (IsFirstCmdQuick, Cmd, CmdOrder, Sr, CmdBuf, StarGainBuf, IsFifthForm, EnemyMul, Hits, IsCrit, IsOverKill) {
            if (IsFirstCmdQuick)
                IsFirstCmdQuick = 0.2;
            else
                IsFirstCmdQuick = 0;
            if (IsCrit)
                IsCrit = 0.2;
            else
                IsCrit = 0;
            if (IsOverKill)
                IsOverKill = 0.3;
            else
                IsOverKill = 0;
            if (IsFifthForm)
                Hits *= 2;

            var temp = Sr / 100 + (CmdStarMul[CmdIndex[Cmd]][CmdOrder - 1] * (100 + CmdBuf) / 100 + IsFirstCmdQuick) + Number(EnemyMul) + Number(StarGainBuf) / 100
                + Number(IsCrit) + Number(IsOverKill);

            if (temp > 3)
                temp = 3;
            else
                temp = Math.floor(Math.round(temp * 10000) / 100) / 100;

            //출력형식 1타당, 최소, 최대, 기댓값

            return {
                starGain1Hit: temp,
                starGainMin: (Math.floor(temp) * Hits),
                starGainMax: (Math.ceil(temp) * Hits),
                expectedStar: Math.round(temp * Hits * 100) / 100
            };
        }

        _FGOcalLib.GetClassMagMul = function (AttackClass, DefendClass) {
            if (isNaN(AttackClass)) {
                AttackClass = ClassIndex[AttackClass];
            }
            if (isNaN(DefendClass)) {
                DefendClass = ClassIndex[DefendClass];
            }
            return Number(ClassDefMag[AttackClass][DefendClass]);
        }

        _FGOcalLib.GetClassDmgMag = function (Class) {
            return ClassDmgMagTable[ClassIndex[Class]];
        }

        _FGOcalLib.GetHiddenMagMul = function (AttackHidden, DefendHidden) {
            if (!isNaN(AttackHidden)) {
                AttackHidden = HiddenIndexKor[AttackHidden];
            }
            if (!isNaN(DefendHidden)) {
                DefendHidden = HiddenIndexKor[DefendHidden];
            }
            return Number(HiddenClassDefMag[HiddenIndex[AttackHidden]][HiddenIndex[DefendHidden]]);
        }

        _FGOcalLib.GetGrailStat = function (StartStat, MaxStat, Rare, GrailLev) {
            var MaxLev = RareMaxLev[Rare];
            if (MaxLev > GrailLev) {
                return -1;
            }
            return Math.floor(Math.floor((GrailLev - 1) / (MaxLev - 1) * 1000) / 1000 * (MaxStat - StartStat) + StartStat);
        }

        _FGOcalLib.GetCraftStat = function (StartStat, MaxStat, Rare, Lev) {
            var MaxLev = CraftMaxLev[Rare];
            if (MaxLev < Lev)
                return -1;
            if (StartStat == MaxStat)
                return StartStat;
            return (StartStat + Math.floor(Math.round((MaxStat - StartStat) / (MaxLev - 1) * 100) / 100) * (Lev - Math.floor((Lev - 1) / 10) * 10 - 1)
                + Math.floor(Math.floor((Lev - 1) / 10) * 10 * Math.round((MaxStat - StartStat) / (MaxLev - 1) * 100) / 100));
        }

        _FGOcalLib.getMaxLevel = function (rare) {
            return RareMaxLev[rare];
        }

        _FGOcalLib.isGeneralClassNotBurseker = function (servClass) {
            return generalClassNotBurseker.includes(servClass);
        }

        _FGOcalLib.isExtraClassNotBeast = function (servClass) {
            return extraClassNotBeast.includes(servClass);
        }

        _FGOcalLib.getClassKor = function (servClass) {
            return ClassKorList[ClassIndex[servClass]];
        }

        return _FGOcalLib;
    }


    if (typeof (window.FGOcal) === 'undefined') {
        window.FGOcal = FGOcalLib();
    }

})(window);

//FGOcal.myCustomLog(["My Library", "Rules"]);