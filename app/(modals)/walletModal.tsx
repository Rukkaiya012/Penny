import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Header from '@/components/Header'
import ImageUpload from '@/components/ImageUpload'
import Input from "@/components/Input"
import ModalWrapper from '@/components/ModalWrapper'
import Typo from "@/components/Typos"
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { createOrUpdateWallet, deleteWallet } from '@/services/walletServices'
import { WalletType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { useLocalSearchParams, useRouter } from 'expo-router'
import * as Icons from "phosphor-react-native"
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'


const WalletModal = () => {
    const {user, updateUserData} = useAuth();
    const [wallet, setWallet] = useState<WalletType>({
    name :"",
    image: null
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();
    useEffect(() => {
        if (oldWallet?.id) {
            setWallet({
                name: oldWallet?.name,
                image: oldWallet?.image,
            });
        }
    }, []);

    const onSubmit = async () => {
        const name = wallet.name ?? ""; 
        const image = wallet.image;    
        if (!name.trim() || !image) {
            Alert.alert("Wallet", "Please fill all the fields");
            return;
        }    

        const data: WalletType ={
            name,
            image,
            uid: user?.uid 
        };
        if(oldWallet?.id) data.id =oldWallet?.id;
        setLoading(true);    
        const res = await createOrUpdateWallet(data);    
        setLoading(false); 
        console.log('result: ', res);   
        if (res.success) {
            router.back();
        } else {
            Alert.alert("Wallet", res.msg);
        }
    };

    const onDelete = async () => {
        if(!oldWallet?.id) return;        
        setLoading(true);        
        const res = await deleteWallet(oldWallet?.id);
        setLoading(false);
        if (res.success){
            router.back();
        }else{
            Alert.alert("wallet", res.msg);
        }        
       };        
     const showDeleteAlert = () => {
        Alert.alert(
          "Confirm",
          "Are you sure you want to do this? \nThis action will remove all the transactions related to this wallet",
          [
            {
              text: "Cancel",
              onPress: () => console.log("cancel delete"),
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => onDelete(), 
              style: "destructive",
            },
          ]
        );
      };
         return (
     <ModalWrapper>
        <View style={styles.container}>
            <Header
            title={oldWallet?.id? "Update Wallet": "New Walllet"}
            leftIcon={<BackButton/>}
            style={{marginBottom: spacingY._10}}
            />

            {/* form */}
            <ScrollView contentContainerStyle={styles.form}>

                <View style={styles.inputContainer}>
                    <Typo color={colors.neutral200}>Wallet Name</Typo>
                    <Input
                    placeholder="Salary"
                    value={wallet.name}
                    onChangeText={(value) =>
                        setWallet({ ...wallet, name: value })
                    }
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Typo color={colors.neutral200}>Wallet Icon</Typo>
                    <ImageUpload
                    file={wallet.image}
                    onClear={() => setWallet({ ...wallet, image: null })}
                    onSelect={(file) => setWallet({ ...wallet, image: file })}
                    placeholder="Upload Image"
                    />
                </View>
            </ScrollView>
        </View>
        <View style={styles.footer}>
            {oldWallet?.id && !loading && (
                <Button
                onPress={showDeleteAlert}
                style={{
                    backgroundColor: colors.rose,
                    paddingHorizontal: spacingX._15,
                }}
                >
                    <Icons. Trash 
                    color={colors.white}
                    size={verticalScale(24)}
                    weight="bold"
                    />
                </Button>
            )}
            <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
                <Typo color={colors.black} fontWeight={"700"} size={18}>
                     Add Wallet
                 </Typo>
            </Button>
        </View>
     </ModalWrapper>
    )
}

export default WalletModal;

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:spacingX._20,
    },
    userInfo:{
        marginTop: verticalScale(30),
        alignItems:"center",
        gap:spacingY._15,
    },
    footer:{
        alignItems: "center",
        flexDirection:"row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1,

    },
    form:{
        gap:spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: 'relative',
        alignSelf:"center",
    },
    avatar: {
        alignSelf:"center",
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
    },
    editIcon: {
        position: 'absolute',
        bottom:5,
        right:8,
        borderRadius:50,
        backgroundColor: colors.neutral100,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
        elevation:4,
        padding:5,        
    },
    inputContainer:{
        gap: spacingY._10
    },
    nameContainer: {
        gap: verticalScale(4),
        alignItems: "center",
    },
    listIcon: {
        height: verticalScale(44),
        width: verticalScale(44),
        backgroundColor: colors.neutral500,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: radius._15,
        borderCurve:"continuous",
    },
    listItem: {
        marginBottom: verticalScale(17),
    },
    accountOptions: {
        marginTop:spacingY._35,
    },
    flexRow: {
        flexDirection:"row",
        alignItems: "center",
        gap: spacingX._10
    },
})