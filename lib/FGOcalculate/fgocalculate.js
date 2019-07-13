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

(function (window){

    function FGOcalLib(){
        var _FGOcalLib = {};

        //수치 데이터 선언 (const)

        const CmdIndex = {
            "arts" : 0,
            "buster" : 1,
            "quick" : 2,
            "extra" : 3,
        };

        const CmdNpGainMul = [
            [3,4.5,6],//arts
            [0,0,0],//buster
            [1,1.5,2],//quick
            [1]//extra
        ];//커멘드 NP 보정계수

        const CmdDmgMul = [
            [1,1.2,1.4],//arts
            [1.5,1.8,2.1],//buster
            [0.8,0.96,1.12],//quick
            [1,1]//extra default, allsamecard (다똑같으면 1, 아니면 2로 order index 입력)
        ];

        const CmdStarMul = [
            [0,0,0],
            [0.1,0.15,0.2],
            [0.8,1.3,1.8],
            [1,1]
        ];

        const ExtraBonus = [2,3.5];

        const ClassIndex=
            {
                "saber" : 0,
                "archer" : 1,
                "lancer" : 2,
                "rider" : 3,
                "caster" : 4,
                "assassin" : 5,
                "berserker" : 6,
                "sheilder" : 7,
                "ruler" : 8,
                "avenger" : 9,
                "mooncancer" : 10,
                "alterego" : 11,
                "foreigner" : 12
            };//클래스 텍스트 인덱스 테이블

        const ClassDmgMagTable = [1,0.95,1.05,1,0.9,0.9,1.1,1,1.1,1.1,1,1,1];//클래스 보정계수

        const ClassDefMag =
            [
                [1,0.5,2,1,1,1,2,1,0.5,1,1,1,1],//saber
                [2,1,0.5,1,1,1,2,1,0.5,1,1,1,1],//archer
                [0.5,2,1,1,1,1,2,1,0.5,1,1,1,1],//lancer
                [1,1,1,1,2,0.5,2,1,0.5,1,1,1,1],//rider
                [1,1,1,0.5,1,2,2,1,0.5,1,1,1,1],//caster
                [1,1,1,2,0.5,1,2,1,0.5,1,1,1,1],//assassin
                [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1,1.5,1.5,1.5,1.5,0.5],//berserker
                [1,1,1,1,1,1,1,1,1,1,1,1,1],//sheilder
                [1,1,1,1,1,1,2,1,1,0.5,2,1,1],//ruler
                [1,1,1,1,1,1,2,1,2,1,0.5,1,1],//avenger
                [1,1,1,1,1,1,2,1,0.5,2,1,1,1],//mooncancer
                [0.5,0.5,0.5,1.5,1.5,1.5,2,1,1,1,1,1,2],//alterego
                [1,1,1,1,1,1,2,1,1,1,1,0.5,2]//foreigner

            ];


        _FGOcalLib.myCustomLog = function(thingtoLog)
        {
            console.log("My-Custom-Log > Type of variable : " + typeof(thingtoLog));
            console.log("My-Custom-Log > Is number : " + !isNaN(thingtoLog));
            console.log("My-Custom-Log > Length : " + (thingtoLog).length);
            console.log("FGO Calculation Library Loaded");

            return console.log(thingtoLog);
        };

        _FGOcalLib.InstantKillRateCalc = function(EnemyDeathRate, InstantKillMul, InstantKillBuf, InstantKillEnemyResBuf, InstantKillEnemyDebuf)
        {
            if(InstantKillEnemyResBuf > 5)
                InstantKillEnemyResBuf = 5;
            if(InstantKillEnemyDebuf > 5)
                InstantKillEnemyDebuf = 5;
            if(InstantKillBuf > 5)
                InstantKillBuf = 5;
            return EnemyDeathRate * InstantKillMul * (100+ InstantKillBuf - InstantKillEnemyResBuf + InstantKillEnemyDebuf)/100;
        }

        _FGOcalLib.NpDamageCalc = function (AtkStat, Class, ClassMagMul, NpCmd, NpMag, AtkBuf, CmdBuf, NpDmgBuf, NpExtraMul,DmgPlus, HpProNpDmgMul,
                                            RanNum, HiddenDefMagMul)
        {
            var tmp = AtkStat * 0.23* CmdDmgMul[CmdIndex[NpCmd]][0]*ClassDmgMagTable[ClassIndex[Class]]*ClassMagMul;

            if(AtkBuf < -100 )
                AtkBuf = -100;
            else if (AtkBuf > 400)
                AtkBuf = 400;
            if(CmdBuf < -100)
                CmdBuf = -100;
            else if(CmdBuf > 400)
                CmdBuf = 400;

            if(NpDmgBuf < -100)
                NpDmgBuf = -100;
            tmp *= (100+AtkBuf)/100 * (100+CmdBuf)/100 * (100+NpDmgBuf)/100;
            if(NpExtraMul > 0)
                tmp *= NpExtraMul/100;
            tmp *= RanNum * HiddenDefMagMul;
            return Math.floor(Math.round(tmp * (NpMag + HpProNpDmgMul))/100 + DmgPlus);
        };

        _FGOcalLib.DamageCalc = function (AtkStat, Class, ClassMagMul, Cmd, CmdOrder,  IsFirstBuster, IsBusterChain, AtkBuf, CmdBuf, ExtraDmgBuf,
                                          CritBuf,DmgPlus,  RanNum, HiddenDefMagMul, IsCrit)
        {
            if(IsFirstBuster)
                IsFirstBuster = 0.5;
            else
                IsFirstBuster = 0;
            if(IsBusterChain)
                IsBusterChain = 0.2;
            else
                IsBusterChain = 0;


            if(AtkBuf < -100 )
                AtkBuf = -100;
            else if (AtkBuf > 400)
                AtkBuf = 400;
            if(CmdBuf < -100)
                CmdBuf = -100;
            else if(CmdBuf > 400)
                CmdBuf = 400;

            var tmp = AtkStat * 0.23 * (CmdDmgMul[CmdIndex[Cmd]][CmdOrder-1] * (100+CmdBuf)/100 + IsFirstBuster)*
                ClassDmgMagTable[ClassIndex[Class]]*ClassMagMul*RanNum * (100+AtkBuf)/100*HiddenDefMagMul;

            if(IsCrit)
                tmp *= 2;
            else
                CritBuf = 0;
            if(Cmd == "extra")
                tmp *= ExtraBonus[CmdOrder-1];

            tmp = tmp * ((100+ExtraDmgBuf+CritBuf))/100 + Number(DmgPlus) + Number(AtkStat) * IsBusterChain;


            return Math.floor(Math.round(tmp*100)/100);



        }

        _FGOcalLib.CmdNpGainCalc = function(IsFirstCmdArts, Cmd, CmdOrder, Na, CmdBuf, NpGainBuf, IsFifthform, EnemyMul, Hits, IsCrit, IsOverKill)
        {
            var temp = Na*(CmdNpGainMul[CmdIndex[Cmd]][CmdOrder-1]*(100+CmdBuf)/100 + IsFirstCmdArts)*EnemyMul*(100+NpGainBuf)/100;
            if(IsCrit)
                temp *= 2;
            temp = Math.floor(Math.round(temp*10000)/100);//소수점 오류 (가끔 -0.0001됨) 방지위해 낮은 자리수 반올림 후 내림
            if(IsOverKill)
                temp *= 1.5;
            if(IsFifthform)//제오세
                temp *= 2;
            return Math.floor(temp*Hits)/100;
        }

        _FGOcalLib.CmdStarGainCalc = function(IsFirstCmdQuick, Cmd, CmdOrder,Sr, CmdBuf, StarGainBuf, IsFifthForm, EnemyMul, Hits, IsCrit, IsOverKill)
        {
            if(IsFirstCmdQuick)
                IsFirstCmdQuick = 0.2;
            else
                IsFirstCmdQuick = 0;
            if(IsCrit)
                IsCrit = 0.2;
            else
                IsCrit = 0;
            if(IsOverKill)
                IsOverKill = 0.3;
            else
                IsOverKill = 0;
            if(IsFifthForm)
                Hits *= 2;

            var temp = Sr/100 + (CmdStarMul[CmdIndex[Cmd]][CmdOrder-1]*(100+CmdBuf)/100 + IsFirstCmdQuick) + Number(EnemyMul) + Number(StarGainBuf)/100
            +Number(IsCrit) + Number(IsOverKill);

            if(temp > 3)
                temp = 3;
            else
                temp = Math.floor(Math.round(temp * 10000)/100)/100;

            //출력형식 1타당, 최소, 최대, 기댓값

            return {
                starGain1Hit : temp,
                starGainMin : (Math.floor(temp) * Hits),
                starGainMax : (Math.ceil(temp) * Hits),
                expectedStar : Math.round(temp * Hits*100)/100
            };
        }

        _FGOcalLib.GetClassMagMul = function(AttackClass, DefendClass)
        {
            return Number(ClassDefMag[ClassIndex[AttackClass]][ClassIndex[DefendClass]]);
        }

        _FGOcalLib.GetClassDmgMag = function(Class)
        {
            return ClassDmgMagTable[ClassIndex[Class]];
        }

        //더만들것 히든상성계산
        //


        return _FGOcalLib;
    }

    if(typeof(window.FGOcal) === 'undefined')
    {
        window.FGOcal = FGOcalLib();
    }

})(window);

//FGOcal.myCustomLog(["My Library", "Rules"]);